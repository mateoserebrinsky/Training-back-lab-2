import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as sgMail from '@sendgrid/mail';

interface EmailProvider {
  sendEmail(to: string, subject: string, text: string): Promise<void>;
}

class SendGridProvider implements EmailProvider {
  constructor(
    apiKey: string,
    private from: string,
  ) {
    sgMail.setApiKey(apiKey);
  }
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await sgMail.send({
      to,
      from: this.from,
      subject,
      text,
    });
  }
}

@Injectable()
export class EmailServices {
  private prisma = new PrismaClient();
  private providers: EmailProvider[];
  private currentProviderIdx = 0;

  constructor() {
    this.providers = [
      new SendGridProvider(process.env.SENDGRID_API_KEY || '', process.env.SENDGRID_FROM || ''),
      //Dejo que se puedan agregar otros
    ];
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    let lastError: any;
    for (let i = 0; i < this.providers.length; i++) {
      try {
        await this.providers[this.currentProviderIdx].sendEmail(to, subject, text);
        return;
      } catch (err) {
        lastError = err;
        this.currentProviderIdx = (this.currentProviderIdx + 1) % this.providers.length;
      }
    }
    throw lastError;
  }
}
import { Controller, Post, Body, HttpCode, HttpException,} from '@nestjs/common';
import { EmailServices } from './email.services';
import { SendEmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailServices: EmailServices) {}

  @Post()
  @HttpCode(202)
  async sendEmail(@Body() { to, subject, text }: SendEmailDto): Promise<{ status: string }> {
    try {
      await this.emailServices.sendEmail(to, subject, text);
      return { status: 'accepted' };
    } catch (e: any) {
      console.error(e);
      throw new HttpException('Failed to send email', 500);
    }
  }
}
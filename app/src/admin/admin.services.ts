import { Get, Injectable, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class AdminServices {
  private prisma = new PrismaClient();
  private jwt: JwtService;

  @Post()
  async createAdmin(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {

    const hashedPassword = hashSync(data.password, 4);

    const user = await this.prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: 'ADMIN'
      },
      select: { user_id: true, username: true, email: true, role: true },
    });

    const payload = { sub: user.user_id, username: user.username, role: user.role};

    return {
      access_token: this.jwt.sign(payload, { expiresIn: '1h' })
    }
  }

  @Get()
  async findAll() {
      return this.prisma.users.findMany({ where: { emails_sent: { not: 0 } } });
    }

}
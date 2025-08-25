import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashSync, compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServices {
  private prisma = new PrismaClient();

  constructor(private readonly jwt: JwtService) {}

  async register(data: {
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
        role: 'USER'
      },
      select: { user_id: true, username: true, email: true, role: true },
    });

    const payload = { sub: user.user_id, username: user.username, role: user.role};

    return {
      access_token: this.jwt.sign(payload, { expiresIn: '1h' })
    }
  }

  async login(data: {
    email:string
    password: string
  }): Promise<{ access_token: string}>{

    const user = await this.prisma.users.findUnique({where: { email: data.email }});

    if (!user || !compareSync(data.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.user_id, username: user.username, role: user.role };

    return {
      access_token: this.jwt.sign(payload, { expiresIn: '1h' })
    }
  }

}
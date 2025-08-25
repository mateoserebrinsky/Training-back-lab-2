import { Get, Injectable, Put, Query, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  @Get()
  async getUserById(@Query() query: UserDto): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({ where: { user_id: query.user_id } });
    if (!user) throw new UnauthorizedException('User not found');
    return user as UserDto;
  }

  @Put(':id')
  async addOneToEmailSentParams(@Query() query: UserDto): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({ where: { user_id: query.user_id } });
    if (!user) throw new UnauthorizedException('User not found');

    const updatedUser = await this.prisma.users.update({
      where: { user_id: query.user_id },
      data: { emails_sent: user.emails_sent + 1 }
    });

    return updatedUser as UserDto;
  }

  @Get(':email')
  async getByEmail(@Query() email: string ): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({where: { email: email } });

    if (!user) throw new UnauthorizedException('User not found');

    return user as UserDto;
  }


}

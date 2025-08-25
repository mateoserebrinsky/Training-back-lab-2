import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthServices } from './auth.services';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthServices) {}


  @Get()
  async login(@Body() data: UserDto): Promise<{ access_token: string }> {
    return this.authServices.login(data)
  }

  @Post()
  async register(@Body() data: UserDto): Promise<{ access_token: string }> {
    return this.authServices.register(data)
  }
}
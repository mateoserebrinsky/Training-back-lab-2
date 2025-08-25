import {Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDto} from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getById(@Query() query: UserDto): Promise<UserDto> {
    return this.usersService.getUserById(query)
  }

  @Put(':id')
  async addOneToUserEmailsSent(@Query() query: UserDto): Promise<UserDto> {
    return this.usersService.addOneToEmailSentParams(query)
  }

  @Get(':email')
  async findOne(@Param() email: string): Promise<UserDto> {
    return this.usersService.getByEmail(email)
  }

}

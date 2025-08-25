import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminServices } from './admin.services';
import {UserDto} from '../users/dto/user.dto';
import { RoleGuard } from '../guards/roleGuard';

@Controller()
@UseGuards(RoleGuard)
export class AdminController {
  constructor(private readonly adminServices: AdminServices) {}

  @Get()
  async getUsers() {
    return this.adminServices.findAll();
  }

  @Post()
  async newAdmin(@Query() data: UserDto){
    return this.adminServices.createAdmin(data)
  }

}
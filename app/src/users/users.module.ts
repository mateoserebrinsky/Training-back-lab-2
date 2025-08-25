import { Module, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthGuard } from '../guards/authGuard';

@UseGuards(AuthGuard)
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}

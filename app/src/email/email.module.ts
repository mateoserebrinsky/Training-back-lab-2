import { Module, UseGuards } from '@nestjs/common';
import { EmailServices } from './email.services';
import { EmailController } from './email.controller';
import { AuthGuard } from '../guards/authGuard';

@UseGuards(AuthGuard)
@Module({
  controllers: [EmailController],
  providers: [EmailServices],
})

export class EmailModule {}
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserService } from './services/create-user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserService],
  imports: [],
})
export class UserModule {}

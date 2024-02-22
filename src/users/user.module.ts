import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserService } from './services/create-user.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserService,
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
  imports: [],
})
export class UserModule {}

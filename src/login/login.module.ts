import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { LoginService } from './services/login.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [PrismaService, LoginService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
})
export class LoginModule {}

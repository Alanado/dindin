import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UserModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

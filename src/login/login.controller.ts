import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { LoginDTO } from './dto/login.dto';

@Controller('/login')
export class LoginController {
  constructor(private readonly login: LoginService) {}

  @Post()
  async loginUser(@Body() data: LoginDTO) {
    return await this.login.execute(data);
  }
}

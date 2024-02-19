import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { CreateUserService } from './services/create-user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly createUser: CreateUserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.createUser.execute(data);
  }
}

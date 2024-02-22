import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, responseUserCreated } from './dto/user.dto';
import { CreateUserService } from './services/create-user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly createUser: CreateUserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUser.execute(data);

    return responseUserCreated.parse(user);
  }
}

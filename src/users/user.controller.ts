import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateUserDTO, responseUser } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user.service';
import { ShowProfileService } from './services/show-profile.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly showProfile: ShowProfileService,
  ) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUser.execute(data);

    return responseUser.parse(user);
  }

  @Get()
  async show(@Request() req) {
    const user = await this.showProfile.execute(req.user.sub);

    return responseUser.parse(user);
  }
}

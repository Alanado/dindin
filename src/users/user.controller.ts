import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO, responseUser } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user.service';
import { ShowProfileService } from './services/show-profile.service';
import { UpdateUserService } from './services/update-user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly showProfile: ShowProfileService,
    private readonly updateUser: UpdateUserService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUser.execute(data);

    return responseUser.parse(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async show(@Request() req) {
    const user = await this.showProfile.execute(req.user.sub);

    return responseUser.parse(user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Request() req, @Body() data: UpdateUserDTO) {
    const user = await this.updateUser.execute({
      ...data,
      id: req.user.sub,
    });

    return responseUser.parse(user);
  }
}

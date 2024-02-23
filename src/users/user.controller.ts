import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO, responseUser } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user.service';
import { ShowProfileService } from './services/show-profile.service';
import { UpdateUserService } from './services/update-user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ReplaceUserDTO } from './dto/replace-user.dto';
import { ReplaceUserService } from './services/replace-user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly showProfile: ShowProfileService,
    private readonly updateUser: UpdateUserService,
    private readonly replaceUser: ReplaceUserService,
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
    const user = await this.updateUser.execute(req.user.sub, { ...data });

    return responseUser.parse(user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async replace(@Request() req, @Body() data: ReplaceUserDTO) {
    await this.replaceUser.execute(req.user.sub, data);

    return;
  }
}

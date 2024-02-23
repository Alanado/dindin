import {
  Body,
  Controller,
  Delete,
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
import { DeleteUserService } from './services/delete-user.service';
import { FindUsersService } from './services/find-users.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly showProfile: ShowProfileService,
    private readonly updateUser: UpdateUserService,
    private readonly replaceUser: ReplaceUserService,
    private readonly deleteUser: DeleteUserService,
    private readonly findUsers: FindUsersService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = await this.createUser.execute(data);

    return responseUser.parse(user);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async show(@Request() req) {
    const user = await this.showProfile.execute(req.user.sub);

    return responseUser.parse(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const users = await this.findUsers.execute();

    return responseUser.array().parse(users);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Request() req, @Body() data: UpdateUserDTO) {
    await this.updateUser.execute(req.user.sub, { ...data });

    return;
  }

  @UseGuards(AuthGuard)
  @Put()
  async replace(@Request() req, @Body() data: ReplaceUserDTO) {
    await this.replaceUser.execute(req.user.sub, data);

    return;
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Request() req) {
    await this.deleteUser.execute(req.user.sub);

    return;
  }
}

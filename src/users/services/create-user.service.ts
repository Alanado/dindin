import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(data: CreateUserDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new HttpException('user already exists.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(data.password, 10);

    return await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string, { name, email, password }: UpdateUserDTO) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (email && email !== user?.email) {
      const userExist = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (userExist) {
        throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
      }
    }

    await this.prismaService.user.update({
      data: {
        name,
        email,
        password: password ? await hash(password, 8) : user?.password,
      },
      where: {
        id,
      },
    });
  }
}

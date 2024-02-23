import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ReplaceUserDTO } from '../dto/replace-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class ReplaceUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string, { name, email, password }: ReplaceUserDTO) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (email !== user?.email) {
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
        password: await hash(password, 8),
      },
      where: {
        id,
      },
    });
  }
}

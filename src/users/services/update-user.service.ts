import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/infra/database/prisma.service';

export type UpdateUser = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

@Injectable()
export class UpdateUserService {
  constructor(private prismaService: PrismaService) {}

  async execute({ id, name, email, password }: UpdateUser) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (email && email !== user?.email) {
      const userExist = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (userExist) {
        throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
      }
    }

    return await this.prismaService.user.update({
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

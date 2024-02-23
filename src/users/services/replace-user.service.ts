import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ReplaceUserDTO } from '../dto/replace-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class ReplaceUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string, data: ReplaceUserDTO) {
    const emailExist = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (emailExist) {
      throw new HttpException('email already used.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(data.password, 8);

    await this.prismaService.user.update({
      data: { ...data, password: hashedPassword },
      where: { id },
    });
  }
}

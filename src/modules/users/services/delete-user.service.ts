import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class DeleteUserService {
  constructor(private prismaService: PrismaService) {}
  async execute(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }
}

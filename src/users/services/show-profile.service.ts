import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class ShowProfileService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }
}

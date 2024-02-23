import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class FindUsersService {
  constructor(private prismaService: PrismaService) {}
  async execute() {
    return this.prismaService.user.findMany();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RegisterMasterDto } from './dto/register-master.dto';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: RegisterMasterDto) {
    return this.prisma.user.create({
      data: {
        role: 'master',
        name: dto.name,
        phone: dto.phone,
        city: dto.city,
        district: dto.district,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RegisterClientDto } from './dto/register-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: RegisterClientDto) {
    return this.prisma.user.create({
      data: {
        role: 'client',
        name: dto.name,
        phone: dto.phone,
        city: dto.city,
        district: dto.district,
      },
    });
  }
}

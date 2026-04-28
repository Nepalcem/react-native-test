import { Body, Controller, Post } from '@nestjs/common';
import { RegisterClientDto } from './dto/register-client.dto';
import { ClientService } from './client.service';

@Controller('users/client')
export class ClientUsersController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() dto: RegisterClientDto) {
    return await this.clientService.create(dto);
  }
}

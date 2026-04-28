import { Body, Controller, Post } from '@nestjs/common';
import { RegisterMasterDto } from './dto/register-master.dto';
import { MasterService } from './master.service';

@Controller('users/master')
export class MasterUsersController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  async create(@Body() dto: RegisterMasterDto) {
    return await this.masterService.create(dto);
  }
}

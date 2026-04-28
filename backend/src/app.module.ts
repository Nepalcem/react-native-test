import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { ClientUsersController } from './users/client/client.controller';
import { MasterUsersController } from './users/master/master.controller';
import { ClientService } from './users/client/client.service';
import { MasterService } from './users/master/master.service';

@Module({
  imports: [],
  controllers: [AppController, ClientUsersController, MasterUsersController],
  providers: [AppService, PrismaService, ClientService, MasterService],
})
export class AppModule {}

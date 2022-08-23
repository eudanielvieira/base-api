import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsRepository])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

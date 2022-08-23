import { Module } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { VariablesController } from './variables.controller';

@Module({
  controllers: [VariablesController],
  providers: [VariablesService]
})
export class VariablesModule {}

import { Module } from '@nestjs/common';
import { LogsModule } from './logs/logs.module';
import { RecursosModule } from './recursos/recursos.module';

@Module({
  imports: [LogsModule, RecursosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

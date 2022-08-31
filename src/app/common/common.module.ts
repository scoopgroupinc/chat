import { Global, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ParseDatePipe } from './pipes/parse-date.pipe';

@Global()
@Module({
  controllers: [HealthController],
  providers: [ParseDatePipe],
  exports: [ParseDatePipe],
})
export class CommonModule {}

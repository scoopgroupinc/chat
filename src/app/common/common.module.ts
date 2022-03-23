import { Global, Module } from '@nestjs/common';
import { ParseDatePipe } from './pipes/parse-date.pipe';

@Global()
@Module({
  providers: [ParseDatePipe],
  exports: [ParseDatePipe],
})
export class CommonModule {}

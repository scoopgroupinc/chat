import { Module } from '@nestjs/common';
import { SQSProducer } from './sqs-producer.service';

@Module({
  providers: [SQSProducer],
  exports: [SQSProducer],
})
export class SQSModule {}

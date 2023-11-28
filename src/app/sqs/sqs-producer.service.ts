import { Inject, Injectable } from '@nestjs/common';
import { Message, Producer } from 'sqs-producer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SQSProducer {
  private producer: Producer;
  constructor(private configService: ConfigService) {
    this.producer = Producer.create({
      region: this.configService.get('aws').region,
      queueUrl: this.configService.get('aws').sqs.queueUrl,
    });
  }

  public produce(data: string | Message | (string | Message)[]) {
    return this.producer.send(data);
  }
}

import { Injectable } from '@nestjs/common';
import { Message, Producer } from 'sqs-producer'; // Ensure 'Message' is the correct type from 'sqs-producer'
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

  // Explicitly type the method
  public produce(data: string | Message | (string | Message)[]): Promise<any> {
    return this.producer.send(data);
  }
}

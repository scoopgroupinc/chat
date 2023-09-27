import { Injectable } from '@nestjs/common';
import {
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusSender,
} from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceBusService {
  private sbClient: ServiceBusClient;
  private sender: ServiceBusSender;
  private configService: ConfigService;

  constructor() {
    this.sbClient = new ServiceBusClient(
      this.configService.get('serviceBusQueue').connectionString,
    );
    this.sender = this.sbClient.createSender(
      this.configService.get('serviceBusQueue').namespace,
    );
  }

  async sendMessage(message: ServiceBusMessage): Promise<void> {
    try {
      await this.sender.sendMessages(message);
      await this.sender.close();
    } catch (err) {
      console.log('Error occurred: ', err);
    } finally {
      await this.sbClient.close();
    }
  }
}

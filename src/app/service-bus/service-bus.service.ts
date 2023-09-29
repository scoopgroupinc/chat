import { Injectable } from '@nestjs/common';
import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceBusService {
  private sbClient: ServiceBusClient;
  private sender: ServiceBusSender;

  constructor(private configService: ConfigService) {
    this.sbClient = new ServiceBusClient(
      this.configService.get('azure').serviceBusQueue.connectionString,
    );
    this.sender = this.sbClient.createSender(
      this.configService.get('azure').serviceBusQueue.namespace,
    );
  }

  async sendMessage(message: any): Promise<void> {
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

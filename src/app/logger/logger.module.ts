import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ILoggerModuleOptions } from './@types/ILoggerModuleOptions';
import { PROVIDER_PREFIX } from './constants';
import { Logger } from './logger.service';

@Module({})
export class LoggerModule {
  public static forFeature(options: ILoggerModuleOptions): DynamicModule {
    const providers: Provider[] = [];
    for (const consumer of options.consumers) {
      providers.push({
        provide: PROVIDER_PREFIX + consumer.name,
        useValue: new Logger(consumer.name),
      });
    }
    return {
      module: LoggerModule,
      providers,
      exports: providers,
    };
  }
}

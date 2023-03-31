import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentTypeEnum } from 'src/environments/EnvironmentTypeEnum';
import { ChatHttpModule } from './chat-http/chat-http.module';
import { ChatWsModule } from './chat-ws/ws.module';
import { CommonModule } from './common/common.module';
import typeormConfig from './config/typeorm.config';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggingMiddleware } from './logger/middlewares/request-logging.middleware';
import awsConfig from './config/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === EnvironmentTypeEnum.PRODUCTION,
      load: [typeormConfig, awsConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (database: ConfigService) => database.get('typeorm'),
    }),
    LoggerModule.forFeature({
      consumers: [RequestLoggingMiddleware],
    }),
    ChatWsModule,
    ChatHttpModule,
    CommonModule,
  ],
})
export class AppModule {}

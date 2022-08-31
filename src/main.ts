import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { config } from './environments/config';

async function bootstrap() {
  let isModuleLoaded = false;
  const isTest = process.env.IS_TEST === 'true';
  async function loadApp(): Promise<INestApplication> {
    setTimeout(() => {
      console.log('isModuleLoaded: ', isModuleLoaded);
      if (!isModuleLoaded && isTest) {
        throw new Error('Module Loading timeout');
      }
    }, config.moduleBootStartpTimeoutInMs);
    const loadedApp = await NestFactory.create(AppModule);
    isModuleLoaded = true;
    return loadedApp;
  }
  const app = await loadApp();

  app.enableCors({
    origin: config.allowedOrigins,
  });
  app.setGlobalPrefix('api/chat');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Scoop chat APIs')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/chat/docs', app, document);
  await app.listen(process.env.PORT);
  if (isTest) {
    setTimeout(() => {
      console.log('App started and exited successfully');
      process.exit(0);
    }, 5000);
  }
}
bootstrap();

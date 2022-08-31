import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { config } from './environments/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  const isTest = process.env.IS_TEST === 'true';
  if (isTest) {
    setTimeout(() => {
      console.log('App started and exited successfully');
      process.exit(0);
    }, 5000);
  }
}
bootstrap();

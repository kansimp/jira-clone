import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Jira',
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Jira Clone API')
    .setDescription('API documentation for the Jira clone application')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const appPort = process.env.PORT ?? 3000;

  const corsOrigins =
    process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()) ||
    `http://localhost:${appPort}`;

  app.enableCors({
    origin: corsOrigins,
  });

  await app.listen(appPort);
}
bootstrap()
  .then(() => {
    new Logger('Bootstrap').log(
      `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
  })
  .catch((error) => {
    new Logger('Bootstrap').error('Error during application bootstrap', error);
  });

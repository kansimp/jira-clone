import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Jira Clone API')
    .setDescription('API documentation for the Jira clone application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const appPort = process.env.PORT ?? 3000;

  const corsOrigins =
    process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()) ||
    `http://localhost:${appPort}`;

  app.enableCors({
    origin: corsOrigins,
  });

  await app.listen(appPort);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});

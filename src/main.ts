import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup with Bearer token support
  const config = new DocumentBuilder()
    .setTitle('Mercado Pago Wrapper API')
    .setDescription('API to interact with Mercado Pago')
    .setVersion('1.0')
    .addBearerAuth(
      // Enable Bearer token authentication
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // Name of the security scheme
    )
    .addTag('payments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger documentation available at /api

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

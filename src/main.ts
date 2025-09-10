// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EndpointService } from './endpoint/endpoint.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();

  const endpointService = app.get(EndpointService);

  try {
    const allEndpoints = endpointService.getAllEndpoints(app);
    await endpointService.resetEndpointsInDatabase(allEndpoints);
  } catch (error) {
    console.error(
      'Failed to delete and save (reset) endpoints in database:',
      JSON.stringify(error, null, 2),
    );
  }

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on Port : 3000}`);
}

bootstrap();

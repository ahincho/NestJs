import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { CustomRpcExceptionFilter } from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  await app.listen(envs.PORT);
  logger.log(`Application running on port ${envs.PORT}`);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(configService.get<number>('PORT') ?? 3000);

  const runMigrations = configService.get<boolean>('RUN_MIGRATIONS', false);
  if (runMigrations) {
    const dataSource = app.get(DataSource); // Use DataSource class as token
    await dataSource.runMigrations();
    console.log('Migrations have been run successfully!');
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
}
bootstrap();

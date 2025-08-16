import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  // === SWAGGER SETUP (BEFORE app.listen!) ===
  const config = new DocumentBuilder()
    .setTitle("Task Management API")
    .setDescription("Task Management API")
    .setVersion("1.0")
    .addTag("Tasks")
    .addTag("Users")
    .addTag("Auth")
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    }, 'access_token')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document);

  // Run migrations before starting the server
  const runMigrations = configService.get<boolean>('RUN_MIGRATIONS', false);
  if (runMigrations) {
    const dataSource = app.get(DataSource);
    await dataSource.runMigrations();
    console.log('Migrations have been run successfully!');
  }

  // START THE SERVER LAST
  await app.listen(configService.get<number>('PORT') ?? 3000);
  console.log(`Application is running on: http://localhost:${configService.get<number>('PORT') ?? 3000}`);
  console.log(`Swagger UI available at: http://localhost:${configService.get<number>('PORT') ?? 3000}/api`);
}
bootstrap();
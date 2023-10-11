import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors(); // Enable CORS for all origins

  await app.listen(PORT);
  console.log(env);
  console.log(PORT);
}
bootstrap();

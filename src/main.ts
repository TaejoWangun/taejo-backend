import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const PORT = process.env.PORT || 4000;
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

  const config = new DocumentBuilder()
    .setTitle("Taejo backend Api Specification")
    .setDescription("The taejo API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documents", app, document);

  await app.listen(PORT);
}
bootstrap();

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe({ transform: true }));
//   await app.listen(3000);
// }
// bootstrap();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  // console.log({ secret: process.env.jwt_secret });
  app.enableCors(); // Enable CORS for all origins

  await app.listen(3000);
}
bootstrap();

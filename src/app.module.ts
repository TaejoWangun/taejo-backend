import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmConfigService } from "./config/typeorm.config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from './modules/users/users.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DevicesModule } from './modules/devices/devices.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 일단 이것은 무조건 가장 위에서!
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 주목
      useClass: TypeOrmConfigService,
      inject: [ConfigService], // 주목
    }),
    UsersModule,
    NotificationsModule,
    DevicesModule,
    InquiriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

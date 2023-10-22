import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/typeorm.config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { DevicesModule } from "./modules/devices/devices.module";
import { InquiriesModule } from "./modules/inquiries/inquiries.module";
import { DataSource, DataSourceOptions } from "typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { MessageModule } from "./modules/messages/message.module";
import {
  FirebaseAppOptionService,
  FirebaseModule,
} from "./modules/messages/firebase/firebase.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }), // 일단 이것은 무조건 가장 위에서!
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 주목
      useClass: TypeOrmConfigService,
      inject: [ConfigService], // 주목
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    FirebaseModule.registerAsync({ useClass: FirebaseAppOptionService }),
    UsersModule,
    NotificationsModule,
    DevicesModule,
    InquiriesModule,
    AuthModule,
    MessageModule,
  ],
})
export class AppModule {}

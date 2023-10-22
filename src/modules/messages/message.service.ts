import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin/app";
import { getMessaging, TokenMessage } from "firebase-admin/messaging";
import { Repository } from "typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MessageService {
  private readonly FIREBASE_PROJECT_ID: string;
  private readonly FIREBASE_PRIVATE_KEY: string;
  private readonly FIREBASE_CLIENT_EMAIL: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    this.FIREBASE_PROJECT_ID = this.configService.get("FIREBASE_PROJECT_ID");
    this.FIREBASE_PRIVATE_KEY = this.configService.get("FIREBASE_PRIVATE_KEY");
    this.FIREBASE_CLIENT_EMAIL = this.configService.get(
      "FIREBASE_CLIENT_EMAIL"
    );
  }

  async sendMessages(userId: string) {
    admin.initializeApp({
      credential: admin.cert({
        projectId: this.FIREBASE_PROJECT_ID,
        privateKey: this.FIREBASE_PRIVATE_KEY,
        clientEmail: this.FIREBASE_CLIENT_EMAIL,
      }),
    });

    const userEntity = await this.userRepository.findOne({
      where: { userId },
      relations: {
        devices: true,
      },
    });

    const tokens = userEntity.devices.map((device) => device.fcmToken);
    const messages: TokenMessage[] = tokens.map((token) => ({
      token,
      notification: {
        title: "title",
        body: "body",
      },
    }));

    return getMessaging().sendEach(messages);
  }
}

import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin/app";
import serviceAccount from "./fcm-push-notification-e8d24-firebase-adminsdk-gchbw-2a528fd7b8.json";
import { getMessaging, TokenMessage } from "firebase-admin/messaging";
import { Repository } from "typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async sendMessages(userId: string) {
    admin.initializeApp({
      credential: admin.cert(serviceAccount),
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

    return await getMessaging().sendEach(messages);
  }
}

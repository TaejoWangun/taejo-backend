import { Injectable } from "@nestjs/common";
import { TokenMessage } from "firebase-admin/messaging";
import { Repository } from "typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { FirebaseService } from "./firebase/firebase.service";

@Injectable()
export class MessageService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly firebaseService: FirebaseService
  ) {}

  async sendMessages(userId: string) {
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

    return this.firebaseService.sendBatchMessages(messages);
  }
}

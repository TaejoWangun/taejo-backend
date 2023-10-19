import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin/app";
import serviceAccount from "./fcm-push-notification-e8d24-firebase-adminsdk-gchbw-2a528fd7b8.json";
import { getMessaging } from "firebase-admin/messaging";

@Injectable()
export class MessageService {
  async sendMessages(token: string) {
    admin.initializeApp({
      credential: admin.cert(serviceAccount),
    });
    const message = {
      data: {
        score: "850",
        time: "2:45",
      },
      token,
    };

    return await getMessaging().send(message);
  }
}

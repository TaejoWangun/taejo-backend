import { Controller, Post } from "@nestjs/common";

@Controller("messages")
export class MessageController {
  @Post()
  sendMessages() {}
}

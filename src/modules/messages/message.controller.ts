import { Body, Controller, Post } from "@nestjs/common";
import { SendMessageDto } from "./dto/send-message.dto";
import { MessageService } from "./message.service";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  sendMessages(@Body() dto: SendMessageDto) {
    return this.messageService.sendMessages(dto.fcmToken);
  }
}

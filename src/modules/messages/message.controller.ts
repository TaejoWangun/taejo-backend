import { Body, Controller, Post } from "@nestjs/common";
import { SendMessageDto } from "./dto/send-message.dto";
import { MessageService } from "./message.service";
import { SendMessageResponseDto } from "./dto/send-message-response.dto";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  async sendMessages(@Body() { userId }: SendMessageDto) {
    const batchResponse = await this.messageService.sendMessages(userId);

    return new SendMessageResponseDto(batchResponse);
  }
}

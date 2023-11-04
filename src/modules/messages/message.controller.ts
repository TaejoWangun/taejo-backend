import { Body, Controller, Post } from "@nestjs/common";
import { SendMessageDto } from "./dto/send-message.dto";
import { MessageService } from "./message.service";
import { SendMessageResponseDto } from "./dto/send-message-response.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiCustomCreatedResponse } from "../common/api-response.dto";

@ApiTags("messages")
@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @ApiOperation({ description: "device에 메시지 전송" })
  @ApiCustomCreatedResponse(SendMessageResponseDto)
  @Post()
  async sendMessages(@Body() { userId }: SendMessageDto) {
    const batchResponse = await this.messageService.sendMessages(userId);

    return new SendMessageResponseDto(batchResponse);
  }
}

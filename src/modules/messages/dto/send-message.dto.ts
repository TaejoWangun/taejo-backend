import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SendMessageDto {
  @ApiProperty({ description: "user id" })
  @IsString()
  userId: string;
}

import { BatchResponse } from "firebase-admin/messaging";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { FirebaseError } from "firebase-admin/lib/app";

export class SendResponseDto {
  /**
   * A boolean indicating if the message was successfully handed off to FCM or
   * not. When true, the `messageId` attribute is guaranteed to be set. When
   * false, the `error` attribute is guaranteed to be set.
   */
  @ApiProperty({ description: "성공 여부" })
  success: boolean;
  /**
   * A unique message ID string, if the message was handed off to FCM for
   * delivery.
   *
   */
  @ApiPropertyOptional({ description: "메시지 unique id" })
  messageId?: string;
  /**
   * An error, if the message was not handed off to FCM successfully.
   */
  @ApiPropertyOptional({ description: "에러" })
  error?: FirebaseError;
}

export class SendMessageResponseDto {
  @ApiProperty({ description: "SendResponse", type: SendResponseDto })
  responses: SendResponseDto[];
  /**
   * The number of messages that were successfully handed off for sending.
   */
  @ApiProperty({ description: "성공한 메시지 갯수" })
  successCount: number;
  /**
   * The number of messages that resulted in errors when sending.
   */
  @ApiProperty({ description: "실패한 메시지 갯수" })
  failureCount: number;
  constructor(batchResponse: BatchResponse) {
    this.responses = batchResponse.responses;
    this.successCount = batchResponse.successCount;
    this.failureCount = batchResponse.failureCount;
  }
}

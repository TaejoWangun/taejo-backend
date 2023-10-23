import { BatchResponse } from "firebase-admin/messaging";

export class SendMessageResponseDto {
  constructor(public readonly batchResponse: BatchResponse) {}
}

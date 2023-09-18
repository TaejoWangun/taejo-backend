import { IsString } from "class-validator";

export class UpdateDeviceDto {
  @IsString()
  readonly uuid: string;

  @IsString()
  readonly fcmToken: string;
}

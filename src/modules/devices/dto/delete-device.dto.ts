import { IsString } from "class-validator";

export class DeleteDeviceDto {
  @IsString()
  readonly uuid: string;
}

import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsObject,
} from "class-validator";
import { DeviceEntity } from "src/modules/devices/entities/device.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
export class CreateNotificationDto {
  @IsString()
  readonly wavURL: string;
  @IsBoolean()
  readonly readStatus: boolean;
  @IsObject()
  readonly user: UserEntity;
  @IsObject()
  readonly device: DeviceEntity;
}

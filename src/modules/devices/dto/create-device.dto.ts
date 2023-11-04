import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { ModeType } from "src/constants";
import { Type } from "class-transformer";
import { DeviceType } from "src/constants/devices-type";

class UserToDeviceDto {
  @IsString()
  readonly userId: string;
}

export class CreateDeviceDto {
  @IsString()
  readonly fcmToken: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly mode: ModeType;

  @IsString()
  readonly type: DeviceType;

  @IsDateString()
  readonly startTime: Date;

  @IsDateString()
  readonly endTime: Date;

  @IsBoolean()
  readonly activeStatus: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserToDeviceDto)
  readonly user: UserToDeviceDto[];
}

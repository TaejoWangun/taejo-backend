import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNumber,
  IsString,
} from "class-validator";
import { ModeType } from "src/constants";

export class CreateDeviceDto {
  @IsString()
  readonly fcmToken: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly mode: ModeType;

  @IsDateString()
  readonly startTime: Date;

  @IsDateString()
  readonly endTime: Date;

  @IsNumber()
  readonly alarmCount: number;

  @IsBoolean()
  readonly activeStatus: boolean;
}

import { IsBoolean, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";

class UserToNotificationDto {
  @IsString()
  readonly userId: string;
}

class DeviceToNotificationDto {
  @IsString()
  readonly uuid: string;
}

export class CreateNotificationDto {
  @IsString()
  readonly wavURL: string;

  @IsBoolean()
  readonly readStatus: boolean;

  @ValidateNested({ each: true })
  @Type(() => UserToNotificationDto)
  readonly user: UserToNotificationDto[];

  @ValidateNested({ each: true })
  @Type(() => DeviceToNotificationDto)
  readonly device: DeviceToNotificationDto[];
}

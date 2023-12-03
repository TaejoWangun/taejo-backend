import { IsString, ValidateNested } from "class-validator";
import { InquiryType } from "../../../constants";
import { Type } from "class-transformer";

class UserToInquiryDto {
  @IsString()
  readonly userId: string;
}

export class CreateInquiryDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly inquiryType: InquiryType;

  @IsString()
  readonly content: string;
}

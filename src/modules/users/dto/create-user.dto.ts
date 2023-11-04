import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "user id" })
  @IsString()
  userId: string;

  @ApiProperty({ description: "이메일" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "비밀번호" })
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

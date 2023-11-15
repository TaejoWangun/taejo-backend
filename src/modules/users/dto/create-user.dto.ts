import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "user id", example: "user123" })
  @IsString()
  userId: string;

  @ApiProperty({ description: "이메일", example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "비밀번호", example: "Password@1" })
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

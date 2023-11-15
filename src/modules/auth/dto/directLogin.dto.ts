import { ApiProperty } from "@nestjs/swagger";

export class DirectLoginDto {
  @ApiProperty({
    description: "이메일 또는 유저 아이디",
    example: "12345 또는 abc@naver.com",
  })
  username: string;

  @ApiProperty({ description: "비밀번호", example: "Password@1" })
  password: string;
}

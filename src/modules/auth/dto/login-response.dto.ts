import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "src/modules/users/dto/userResponseDto";

export class AuthTokenDto {
  @ApiProperty({
    description: "JWT access token for authentication",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  accessToken: string;

  @ApiProperty({
    description: "JWT refresh token for generating new access tokens",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  refreshToken: string;
}

export class LoginResponseDto extends UserResponseDto {
  @ApiProperty({ description: "Auth tokens", type: AuthTokenDto })
  tokens: AuthTokenDto;
}

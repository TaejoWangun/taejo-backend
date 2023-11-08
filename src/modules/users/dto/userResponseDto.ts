import { ApiProperty } from "@nestjs/swagger";
import { RoleType } from "src/constants";

export class UserResponseDto {
  @ApiProperty({
    description: "The unique identifier of the user",
    example: "12345",
  })
  userId: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "john.doe@example.com",
  })
  email: string;

  @ApiProperty({
    description: "The role of the user in the system",
    example: RoleType.USER,
    enum: RoleType,
  })
  role: RoleType;

  @ApiProperty({
    description: "The date and time when the user was created",
    example: "2023-01-01T00:00:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description:
      "The date and time when the user's information was last updated",
    example: "2023-01-02T00:00:00Z",
  })
  updatedAt: Date;

  // The deletedAt field is not included in the DTO as it's not relevant to the client
}

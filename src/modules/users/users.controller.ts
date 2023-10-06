import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("direct")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(":userId")
  findOne(@Param("userId") userId: string) {
    return this.usersService.findOne(userId);
  }

  //already have this in auth post registeration
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Put(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @UseGuards(JwtGuard)
  // @Get(':id/comments')
  // getUserComment(@Param('id') id: string) {
  //   return this.commentService.findUserComments(id);
  // }
}

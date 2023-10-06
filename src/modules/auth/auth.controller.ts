import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("direct")
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  // @Post("register")
  // async registerUser(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.create(createUserDto);
  // }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}

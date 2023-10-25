import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { GoogleOauthGuard } from "./guards/oauth-auth.guard";

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

  @Get("to-google")
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Request() req) {}

  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
    // return await this.authService.login(req.user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}

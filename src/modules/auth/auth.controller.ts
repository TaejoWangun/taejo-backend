import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";
import { GoogleOauthGuard, naverOauthGuard } from "./guards/oauth-auth.guard";
import { User } from "../common/decorators/user.decorator";
import { UserEntity } from "../users/entities/user.entity";
import { Response as Res } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
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

  // google 로그인
  @Get("to-google")
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Request() req) {}

  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    const jwt = this.authService.login(user);
    res.set("authorization", (await jwt).accessToken);
    res.json(user);
  }

  // naver 로그인
  @Get("to-naver")
  @UseGuards(naverOauthGuard)
  async naverAuth(@Request() req) {}

  @Get("naver/callback")
  @UseGuards(naverOauthGuard)
  async naverAuthRedirect(@User() user: UserEntity, @Response() res: Res) {
    const jwt = await this.authService.login(user);
    res.set("authorization", jwt.accessToken);
    res.json(user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}

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
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DirectLoginDto } from "./dto/\bdirectLogin.dto";
import { ApiCustomCreatedResponse } from "../common/api-response.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @ApiOperation({ description: "직접 로그인" })
  @ApiCustomCreatedResponse(LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: DirectLoginDto })
  @Post("direct")
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  // google 로그인
  @UseGuards(GoogleOauthGuard)
  @Get("to-google")
  async googleAuth(@Request() req) {}

  @UseGuards(GoogleOauthGuard)
  @Get("google/callback")
  async googleAuthRedirect(@User() user: UserEntity, @Response() res: Res) {
    const jwt = await this.authService.login(user);
    res.set("authorization", jwt.accessToken);
    res.json(user);
  }

  // naver 로그인
  @UseGuards(naverOauthGuard)
  @Get("to-naver")
  async naverAuth(@Request() req) {}

  @UseGuards(naverOauthGuard)
  @Get("naver/callback")
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

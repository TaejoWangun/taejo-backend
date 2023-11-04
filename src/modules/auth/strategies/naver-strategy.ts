import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class naverStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const userId = profile.id;
    const email = profile.emails[0].value;
    const userName = profile.displayName;
    const user: UserEntity = await this.userService.findByEmailOrSave(
      email,
      userName,
      userId
    );
    return user || null;
  }
}

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log("accessToken: " + accessToken);
    console.log("refreshToken: " + refreshToken);
    // console.log(profile);
    // const provider = "google";
    const userId = id;
    const email = emails[0].value;
    const userName = name.familyName + name.givenName;
    console.log(userId, email, userName);
    const user: UserEntity = await this.userService.findByEmailOrSave(
      email,
      userName,
      userId
    );
    return user || null;
  }
}

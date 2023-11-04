import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";
dotenv.config();

export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: 'code',
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}

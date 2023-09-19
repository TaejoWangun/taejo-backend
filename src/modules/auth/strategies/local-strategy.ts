import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    // {usernameField: 'email'}
  }

  async validate(username: string, password: string) {
    console.log("Username:", username);
    console.log("Password:", password);
    const user = await this.authService.validateUser(username, password);
    console.log("Returned User:", user);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    return user;
  }
}

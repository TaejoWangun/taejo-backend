import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LocalStrategy } from "./strategies/local-strategy";
import { JwtStrategy } from "./strategies/jwt-strategy";
import { RefreshJwtStrategy } from "./strategies/refreshToken.strategy";
import { GoogleStrategy } from "./strategies/google-strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      //secret: "abcd",
      signOptions: { expiresIn: "3600s" },
    }),
    PassportModule.register({ session: false }),
    UsersModule,
  ],
})
export class AuthModule {}

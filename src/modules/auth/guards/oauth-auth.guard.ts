import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleOauthGuard extends AuthGuard("google") {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    // console.log("result: " + result);
    const request = context.switchToHttp().getRequest();
    // console.log("request1 : " + request);
    await super.logIn(request);
    // console.log("request2: " + request);
    return result;
  }
}

@Injectable()
export class naverOauthGuard extends AuthGuard("naver") {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    // console.log("result: " + result);
    const request = context.switchToHttp().getRequest();
    // console.log("request1 : " + request);
    await super.logIn(request);
    // console.log("request2: " + request);
    return result;
  }
}

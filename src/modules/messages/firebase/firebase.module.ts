import {
  DynamicModule,
  Global,
  Injectable,
  Module,
  Provider,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FirebaseAppAsyncOptions, FirebaseAppOptions } from "./firebase.option";
import { FirebaseService } from "./firebase.service";
import { FIREBASE_INITIALIZATION_OPTION } from "./firebase.const";

export interface FirebaseAppOptionsFactory {
  createFirebaseAppOptions(): Promise<FirebaseAppOptions> | FirebaseAppOptions;
}

@Injectable()
export class FirebaseAppOptionService implements FirebaseAppOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createFirebaseAppOptions(): Promise<FirebaseAppOptions> | FirebaseAppOptions {
    return {
      projectId: this.configService.get("FIREBASE_PROJECT_ID"),
      privateKey: this.configService.get("FIREBASE_PRIVATE_KEY"),
      clientEmail: this.configService.get("FIREBASE_CLIENT_EMAIL"),
    };
  }
}

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {
  static registerAsync(options: FirebaseAppAsyncOptions): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [...this.createFirebaseOption(options)],
    };
  }

  private static createFirebaseOption(
    options: FirebaseAppAsyncOptions
  ): Provider[] {
    return [
      {
        provide: FIREBASE_INITIALIZATION_OPTION,
        useFactory: async (optionsFactory: FirebaseAppOptionsFactory) =>
          await optionsFactory.createFirebaseAppOptions(),
        inject: [options.useClass],
      },
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }
}

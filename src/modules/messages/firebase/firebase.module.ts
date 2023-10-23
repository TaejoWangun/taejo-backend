import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FirebaseAppAsyncOptions, FirebaseAppOptions } from "./firebase.option";
import { FirebaseService } from "./firebase.service";
import { FIREBASE_INITIALIZATION_OPTION } from "./firebase.const";

export interface FirebaseAppOptionsFactory {
  createFirebaseAppOptions(): Promise<FirebaseAppOptions> | FirebaseAppOptions;
}

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
@Module({})
export class FirebaseModule {
  static registerAsync(options: FirebaseAppAsyncOptions): DynamicModule {
    return {
      module: FirebaseModule,
      imports: [ConfigModule],
      providers: [FirebaseService, ...this.createFirebaseOption(options)],
      exports: [FirebaseService],
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
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return new options.useClass(configService);
        },
      },
    ];
  }
}

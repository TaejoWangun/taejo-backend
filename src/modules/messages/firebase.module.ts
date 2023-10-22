import {
  DynamicModule,
  Global,
  Inject,
  Injectable,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from "@nestjs/common";
import * as admin from "firebase-admin/app";
import { ConfigModule, ConfigService } from "@nestjs/config";

export interface FirebaseAppOptions {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}

export interface FirebaseAppAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useExisting?: Type<FirebaseAppOptionsFactory>;
  useClass?: Type<FirebaseAppOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<FirebaseAppOptions> | FirebaseAppOptions;
}

interface FirebaseAppOptionsFactory {
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
        provide: "FIREBASE_INITIALIZATION_OPTION",
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

@Injectable()
export class FirebaseService {
  private _firebaseApp;

  constructor(@Inject("FIREBASE_INITIALIZATION_OPTION") private _options) {
    this._firebaseApp = admin.initializeApp({
      credential: admin.cert(this._options),
    });
  }

  async connect(): Promise<any> {
    return this._firebaseApp
      ? this._firebaseApp
      : (this._firebaseApp = admin.initializeApp({
          credential: admin.cert(this._options),
        }));
  }
}

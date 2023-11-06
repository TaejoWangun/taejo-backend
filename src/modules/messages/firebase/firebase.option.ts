import { ModuleMetadata, Type } from "@nestjs/common";
import { FirebaseAppOptionsFactory } from "./firebase.module";

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

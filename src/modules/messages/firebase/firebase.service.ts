import { Inject, Injectable } from "@nestjs/common";
import * as admin from "firebase-admin/app";
import { FIREBASE_INITIALIZATION_OPTION } from "./firebase.const";

@Injectable()
export class FirebaseService {
  private _firebaseApp;

  constructor(@Inject(FIREBASE_INITIALIZATION_OPTION) private _options) {
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

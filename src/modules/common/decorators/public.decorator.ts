import { SetMetadata } from "@nestjs/common";
import { ISPUBLIC } from "src/constants";

export const Public = () => SetMetadata(ISPUBLIC, true);

import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from "@nestjs/swagger";

export const ApiCustomCreatedResponse = <T extends Type>(dto: T) => {
  return applyDecorators(
    ApiExtraModels(dto),
    ApiCreatedResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(dto),
          },
        ],
      },
    })
  );
};

import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: String(process.env.DATABASE_TYPE),
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT
//     ? parseInt(process.env.DATABASE_PORT, 10)
//     : 5432,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   // synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
//   entities: ["dist/modules/**/**/*.entity{.ts,.js}"],
//   migrations: ["dist/database/migrations/**/*{.ts,.js}"],
// } as DataSourceOptions);

export const dataSourceOptions = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: false,
  entities: ["dist/modules/**/**/*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations/**/*{.ts,.js}"],
} as DataSourceOptions);

import { config } from "dotenv";
import { DataSource } from 'typeorm';

const environment = process.env.NODE_ENV || 'development';

config({
  path: `.env.${environment}`
})

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts']
});

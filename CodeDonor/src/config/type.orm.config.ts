import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'nest',
  username: 'postgres',
  password: 'ahincho',
  autoLoadEntities: true,
  synchronize: true
}

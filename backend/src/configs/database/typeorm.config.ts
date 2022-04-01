import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRESQL_CONFIG } from '../constant.config';

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: POSTGRESQL_CONFIG.host,
  port: POSTGRESQL_CONFIG.port,
  username: POSTGRESQL_CONFIG.username,
  password: POSTGRESQL_CONFIG.password,
  database: POSTGRESQL_CONFIG.database,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: true,
  // logging: true,
};

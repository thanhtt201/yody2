import { config } from 'dotenv';

config();

export const POSTGRESQL_CONFIG = {
  host: process.env.POSTGRESQL_HOST || '',
  username: process.env.POSTGRESQL_USERNAME || '',
  password: process.env.POSTGRESQL_PASSWORD || '',
  database: process.env.POSTGRESQL_DATABASE_NAME || '',
  port: +process.env.POSTGRESQL_PORT || 3306,
};

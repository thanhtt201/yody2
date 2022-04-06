import { config } from 'dotenv';

config();

export const JWT_CONFIG = {
  accessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN,
};

export const POSTGRESQL_CONFIG = {
  host: process.env.POSTGRESQL_HOST || '',
  username: process.env.POSTGRESQL_USERNAME || '',
  password: process.env.POSTGRESQL_PASSWORD || '',
  database: process.env.POSTGRESQL_DATABASE_NAME || '',
  port: +process.env.POSTGRESQL_PORT || 3306,
};

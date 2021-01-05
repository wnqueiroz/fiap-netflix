import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

import * as path from 'path';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    synchronize: true,
    entities: [path.resolve(__dirname, '../**/*.entity{.ts,.js}')],
  }),
);

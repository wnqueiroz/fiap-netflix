import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

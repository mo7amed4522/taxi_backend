import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AdminAPIModule } from './admin_api/admin.module';
import { DatabaseModule } from './database.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { DriverAPIModule } from './driver_api/driver-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    AdminAPIModule,
    DriverAPIModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

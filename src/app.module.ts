import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ormConfigLocal } from './common/configs/orm.local.config';
import { ormConfigStaging } from './common/configs/orm.staging.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.local' : '.env.staging',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return process.env.NODE_ENV === 'dev'
          ? ormConfigLocal(configService)
          : ormConfigStaging(configService);
      },
    }),
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}

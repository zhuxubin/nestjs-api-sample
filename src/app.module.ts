import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigEnum } from './common/eumn/config.enum';
import { AppInterceptor } from './common/interceptors/app.interceptor';
import { UserModule } from './user/user.module';

// 根据变量读取环境类型（）
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_PORT: Joi.number().default(3306),
                DB_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()),
                DB_TYPE: Joi.string().valid('mysql', 'postgres'),
                DB_DATABASE: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_SYNC: Joi.boolean().default(false),
                LOG_ON: Joi.boolean(),
                LOG_LEVEL: Joi.string(),
            }),
            isGlobal: true,
            envFilePath,
            load: [() => dotenv.config({ path: '.env' })],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ({
                    type: configService.get(ConfigEnum.DB_TYPE),
                    host: configService.get(ConfigEnum.DB_HOST),
                    port: configService.get(ConfigEnum.DB_PORT),
                    username: configService.get(ConfigEnum.DB_USERNAME),
                    password: configService.get(ConfigEnum.DB_PASSWORD),
                    database: configService.get(ConfigEnum.DB_DATABASE),
                    autoLoadEntities: process.env.NODE_ENV === 'development', // 自动加载相关模型（开发环境下）
                    synchronize: configService.get(ConfigEnum.DB_SYNC),
                    logging: process.env.NODE_ENV === 'development' || ['error'], // 打印sql日志
                } as TypeOrmModuleOptions),
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        Logger,
        {
            provide: APP_INTERCEPTOR, // 拦截器
            useClass: AppInterceptor,
        },
    ],
    exports: [Logger],
})
export class AppModule {}

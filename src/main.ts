import {
    HttpStatus,
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import winston, { createLogger } from 'winston';
import 'winston-daily-rotate-file';

import { AppModule } from './app.module';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import * as path from 'path';

async function bootstrap() {
    // 创建第三方日志模块Winston
    const instance = createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    utilities.format.nestLike(),
                ),
            }),
            new winston.transports.DailyRotateFile({
                level: 'info',
                dirname: 'logs',
                filename: `application-%DATE%.log`,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    utilities.format.nestLike(),
                ),
            }),
            new winston.transports.DailyRotateFile({
                level: 'verbose',
                dirname: 'logs',
                filename: `application-%DATE%.log`,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    utilities.format.nestLike(),
                ),
            }),
        ],
    });
    const logger = WinstonModule.createLogger({
        instance,
    });

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger, // 更换官方的日志模块
    });

    // 开启全局验证管道
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            exceptionFactory: (errors: ValidationError[]) => {
                return new UnprocessableEntityException(
                    errors
                        .filter((item) => !!item.constraints)
                        .flatMap((item) => Object.values(item.constraints))
                        .join('; '),
                );
            },
        }),
    );

    app.useStaticAssets({ root: path.join(__dirname, '..', 'public') }); // 静态文件路径
    app.enableCors();

    await app.listen(3000);
}
bootstrap();

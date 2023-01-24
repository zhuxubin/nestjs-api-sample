import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

import { ConfigEnum } from '@/common/eumn/config.enum';
import { UserModule } from '@/user/user.module';

import * as controllers from './controllers';
import * as dtos from './dtos';
import * as services from './services';
import * as strategies from './strategies';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>(ConfigEnum.SECRET),
                    signOptions: {
                        expiresIn: '1d', // 有效期1天
                    },
                };
            },
        }),
    ],
    providers: [...Object.values(services), ...Object.values(dtos), ...Object.values(strategies)],
    controllers: [...Object.values(controllers)],
    exports: [],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigEnum } from '@/common/eumn/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(protected configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(ConfigEnum.SECRET),
        });
    }

    async validate(payload: any) {
        // req.user
        return { userId: payload.sub, username: payload.username };
    }
}

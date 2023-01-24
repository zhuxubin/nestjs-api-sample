import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigEnum } from './common/eumn/config.enum';

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService, private readonly logger: Logger) {}

    @Get()
    getHello() {
        this.logger.log('hello world~~~');
        console.log(this.configService.get(ConfigEnum.DB_TYPE));
        console.log(this.configService.get(ConfigEnum.DB_HOST));
    }
}

import {
    LoggerService,
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

// 异常信息 http 过滤器
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: LoggerService) {}

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        // 响应 请求对象
        const response = ctx.getResponse<FastifyReply>();

        // http状态码
        const status = exception.getStatus();
        this.logger.error(exception.message, exception.stack); // 记录错误信息
        response.status(status).send({
            code: status,
            data: null,
            message: exception.message || exception.name,
        });
    }
}

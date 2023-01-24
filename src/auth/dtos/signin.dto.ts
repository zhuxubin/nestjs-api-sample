import { Injectable } from '@nestjs/common';
import { Length } from 'class-validator';

/**
 * 创建用户验证
 */
@Injectable()
export class SigninDto {
    @Length(4, 50, { always: true, message: '用户名不得少于$constraint1' })
    username!: string;

    @Length(6, 8, {
        always: true,
        message: '密码长度不得少于$constraint1',
    })
    password!: string;
}

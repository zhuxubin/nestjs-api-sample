import { Injectable } from '@nestjs/common';
import { IsNotEmpty, Length } from 'class-validator';

import { IsMatch } from '@/common/constraints';
import { User } from '@/user/entities';

import { IsUnique } from '../constraints';

/**
 * 创建用户验证
 */
@Injectable()
export class SignupDto {
    @Length(4, 50, { always: true, message: '用户名不得少于$constraint1' })
    @IsUnique(
        { entity: User },
        {
            // groups: ['user-register'],
            message: '该用户名已被注册',
        },
    )
    username!: string;

    @Length(6, 8, {
        always: true,
        message: '密码长度不得少于$constraint1',
    })
    password!: string;

    @Length(6, 8, {
        always: true,
        message: `密码长度介于$constraint1到$constraint2之间`,
    })
    @IsNotEmpty({ message: '请再次输入密码以确认', always: true })
    @IsMatch('password', { message: '两次输入密码不同', always: true })
    readonly plainPassword!: string;

    avatar?: string;
}

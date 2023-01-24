import { Injectable } from '@nestjs/common';
import { Length } from 'class-validator';

/**
 * 创建用户验证
 */
@Injectable()
export class UserDto {
    @Length(4, 50, { always: true })
    username!: string;
}

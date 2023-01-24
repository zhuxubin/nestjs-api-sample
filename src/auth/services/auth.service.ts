import { ForbiddenException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

import { UserService } from '@/user/services';

import { SignupDto, SigninDto } from '../dtos';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwt: JwtService) {}

    async signin(data: SigninDto) {
        const { username, password } = data;

        const user = await this.userService.findUser(username);
        if (!user) {
            throw new ForbiddenException('用户不存在，请进行注册');
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            throw new ForbiddenException('用户名或者密码错误');
        }

        const token = await this.jwt.signAsync({
            username: user.username,
            sub: user.id,
        });

        return {
            access_token: token,
        };
    }

    async signup(data: SignupDto) {
        console.log(data);
        const user = await this.userService.addUser(data);
        const token = await this.jwt.signAsync({
            username: user.username,
            sub: user.id,
        });

        return {
            access_token: token,
        };
    }
}

import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';

import { SignupDto } from '@/auth/dtos';

import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async addUser(user: SignupDto) {
        const userTemp = await this.userRepository.save(user);
        userTemp.password = await argon2.hash(userTemp.password);
        const res = await this.userRepository.save(userTemp);
        return res;
    }

    async findUser(username: string) {
        return this.userRepository.findOne({
            where: { username },
        });
    }
}

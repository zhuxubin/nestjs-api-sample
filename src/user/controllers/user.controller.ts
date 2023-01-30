import { Body, Controller, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';

import { ReqUser } from '@/common/decorators';
import { JwtGuard } from '@/common/guards';

import { UserDto } from '../dtos/user.dto';

import { UserService } from '../services';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(protected readonly userService: UserService) {}

    @Get('/profile')
    async getUserProfile(@ReqUser() user: any) {
        return this.userService.findUser(user.id);
    }

    @Post('/find')
    async findUser(@Body() dto: UserDto) {
        const { username } = dto;
        const user = await this.userService.findUser(username);
        if (!user) {
            throw new NotFoundException('用户不存在');
        }
        return user;
    }
}

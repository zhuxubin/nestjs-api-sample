import { Body, Controller, Post } from '@nestjs/common';

import { SigninDto, SignupDto } from '../dtos';
import { CreateUserPipe } from '../pipes';

import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
    constructor(protected readonly authService: AuthService) {}

    @Post('/signin')
    async signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }

    @Post('/signup')
    async signup(@Body(CreateUserPipe) dto: SignupDto) {
        return this.authService.signup(dto);
    }
}

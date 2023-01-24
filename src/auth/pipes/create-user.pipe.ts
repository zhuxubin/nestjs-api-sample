import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { SignupDto } from '../dtos';

@Injectable()
export class CreateUserPipe implements PipeTransform {
    transform(value: SignupDto, metadata: ArgumentMetadata) {
        value.avatar = 'logo.ng'; // 设置默认头像
        return value;
    }
}

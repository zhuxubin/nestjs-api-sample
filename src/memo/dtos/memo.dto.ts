import { Injectable } from '@nestjs/common';
import { Length } from 'class-validator';

import { PaginateDto } from '@/common/dtos';

@Injectable()
export class MemoDto {
    @Length(6, 50, { always: true, message: '标题长度不小于为$constraint1' })
    title!: string;
}

@Injectable()
export class MemoListDto extends PaginateDto {}

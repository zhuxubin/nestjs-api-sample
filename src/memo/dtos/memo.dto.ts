import { Injectable } from '@nestjs/common';
import { Length } from 'class-validator';

import { PaginateDto } from '@/common/dtos';

@Injectable()
export class MemoDto {
    @Length(4, 50, { always: true })
    title!: string;
}

@Injectable()
export class MemoListDto extends PaginateDto {}

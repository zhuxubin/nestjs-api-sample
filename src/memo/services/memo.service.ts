import { Injectable, NotFoundException } from '@nestjs/common';

import { MemoDto, MemoListDto } from '../dtos';
import { Memo } from '../entities';

import { MemoRepository } from '../repositories';

@Injectable()
export class MemoService {
    constructor(private memoRepository: MemoRepository) {}

    async findAll(dto: MemoListDto, userId: number) {
        const { page, pageSize } = dto;
        return this.memoRepository.listMemo(page, pageSize);
    }

    async findOne(id: string) {
        const item = await this.memoRepository.findOne({
            where: { id },
        });
        if (!item) {
            throw new NotFoundException(`数据${id}不存在`);
        }
        return item;
    }

    async addMemo(dto: MemoDto, userId: number) {
        const data = { title: dto.title, userId } as Memo;
        const item = await this.memoRepository.save(data);
        return this.findOne(item.id);
    }

    async delMemo(id: string) {
        return this.memoRepository.softDelete(id);
    }
}

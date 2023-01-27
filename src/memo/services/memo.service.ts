import { Injectable } from '@nestjs/common';

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
        return this.memoRepository.findOne({
            where: { id },
        });
    }

    async addMemo(dto: MemoDto, userId: number) {
        const data = { title: dto.title, userId } as Memo;
        return this.memoRepository.save(data);
    }

    async delMemo(id: string) {
        return this.memoRepository.delete(id);
    }
}

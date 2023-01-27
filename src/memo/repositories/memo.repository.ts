import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Memo } from '../entities';

@Injectable()
export class MemoRepository extends Repository<Memo> {
    constructor(protected dataSource: DataSource) {
        super(Memo, dataSource.createEntityManager());
    }

    async listMemo(page: number, pageSize: number) {
        return (
            this.dataSource
                .getRepository(Memo)
                .createQueryBuilder('memo')
                // .leftJoinAndSelect('user.id', 'userId')
                .skip(pageSize * (page - 1))
                .take(pageSize)
                .getMany()
        );
    }
}

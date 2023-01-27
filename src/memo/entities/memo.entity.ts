import { Exclude, Type } from 'class-transformer';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Memo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('uuid')
    @Exclude()
    userId: number;

    @Type(() => Date)
    // @Exclude()
    @CreateDateColumn({
        comment: '创建时间',
    })
    createdAt: Date;

    @Type(() => Date)
    // @Exclude()
    @UpdateDateColumn({
        comment: '更新时间',
    })
    updatedAt: Date;
}

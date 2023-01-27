import { Exclude, Type } from 'class-transformer';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Memo } from '@/memo/entities';

import { Profile } from './profile.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

    @OneToOne(() => Memo)
    @JoinColumn()
    memo: Memo;

    @Type(() => Date)
    @CreateDateColumn({
        comment: '创建时间',
    })
    createdAt: Date;

    @Type(() => Date)
    @UpdateDateColumn({
        comment: '更新时间',
    })
    updatedAt: Date;
}

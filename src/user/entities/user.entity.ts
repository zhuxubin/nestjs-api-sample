import { Exclude, Expose, Type } from 'class-transformer';
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
@Exclude()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: number;

    @Column()
    @Expose()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Expose()
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

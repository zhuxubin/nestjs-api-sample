import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

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
}

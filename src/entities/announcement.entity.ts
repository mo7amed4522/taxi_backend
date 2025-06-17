import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnnouncementUserType } from './enums/anouncement-user-type.enum';
import { MediaEntity } from "./media.entity";
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('promotion')
export class AnnouncementEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => [String])
    @Column('text', { array: true })
    userType!: AnnouncementUserType[];

    @Column({
        name: 'startTimestamp'
    })
    startAt!: Date;

    @Column({
        name: 'expirationTimestamp'
    })
    expireAt!: Date;

    @Field()
    @Column()
    title!: string;

    @Column()
    url?: string;

    @Column()
    description!: string;

    @OneToOne(() => MediaEntity, media => media.announcement)
    @JoinColumn()
    media?: MediaEntity;

    @Column({ nullable: true })
    mediaId?: number;

    @Field()
    @CreateDateColumn()
    createdAt!: Date;
}
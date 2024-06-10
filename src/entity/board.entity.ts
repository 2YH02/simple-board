import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: '유저 아이디',
  })
  @Column()
  userId: number;

  @ApiProperty({
    description: '제목',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '내용',
  })
  @Column()
  content: string;

  @ApiProperty({
    description: '수정일',
  })
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty({
    description: '생성일',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '유저정보',
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}

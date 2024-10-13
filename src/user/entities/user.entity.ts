import { Address } from 'src/address/entities/address.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  fullName: string;
  @Column({ type: 'varchar', unique: true })
  username: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'enum', enum: ['user', 'teacher'], default: 'user' })
  role: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at: Date;
  @OneToOne((type) => User, (user) => user.address)
  address: Address;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher)
  lessons: Lesson[];
}

import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', default: 'tashkent' })
  city: string;
  @Column({ type: 'int' })
  postal_code: number;
  @Column({ type: 'varchar', default: 'tashkent' })
  address: string;
  @Column({ type: 'varchar', unique: true })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at: Date;

  @OneToOne((type) => User, (user) => user.address)
  @JoinColumn()
  user: User;
}

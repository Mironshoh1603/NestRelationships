import { SubCategory } from 'src/subcategory/entities/subcategory.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  video_link: string;
  @Column({ type: 'enum', enum: ['oson', "o'rta", 'qiyin'], default: 'oson' })
  difficulty: string;
  @Column({ type: 'varchar', unique: true })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  create_at: Date;

  @ManyToOne(() => User, (user) => user.lessons)
  @JoinColumn()
  teacher: User;

  @ManyToMany(() => SubCategory, (subCategory) => subCategory.lessons)
  @JoinTable()
  subCategories: SubCategory[];
}

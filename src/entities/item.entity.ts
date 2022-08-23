import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
@Unique(['code'])
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  code: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  description: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  price: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  category: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  image_url: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  thumbnail_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.item)
  @JoinColumn({ name: 'category_id' })
  item: Category;
}

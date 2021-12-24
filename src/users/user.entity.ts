import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  role: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  user: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string

  @Column({ type: 'enum', enum: ['admin', 'employee'], default: 'employee' })
  role: string

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

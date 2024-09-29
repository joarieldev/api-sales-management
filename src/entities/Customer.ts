import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Sales } from './Sales'

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  dni: string

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string

  @OneToMany(() => Sales, (sales) => sales.customer)
  sales: Sales[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

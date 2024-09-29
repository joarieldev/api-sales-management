import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Detail } from './Detail'
import { Customer } from './Customer'

@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'float', nullable: false })
  amount: number

  @ManyToOne(()=>Customer, (customer)=>customer.sales)
  customer: Customer

  @OneToMany(() => Detail, (detail) => detail.sales)
  details: Detail[]

  @CreateDateColumn()
  createdAt: Date
}

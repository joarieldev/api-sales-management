import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Sale } from './Sale'
import { Product } from './Product'

@Entity()
export class Detail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({type: 'int', nullable: false})
  quantity: number

  @ManyToOne(()=>Product, (product)=>product.details)
  product: Product

  @ManyToOne(()=>Sale, (sale)=>sale.details)
  sale: Sale

  @CreateDateColumn()
  createdAt: Date
}

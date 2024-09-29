import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Sales } from './Sales'
import { Product } from './Product'

@Entity()
export class Detail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  quantity: number

  @ManyToOne(()=>Product, (product)=>product.details)
  product: Product

  @ManyToOne(()=>Sales, (sales)=>sales.details)
  sales: Sales

  @CreateDateColumn()
  createdAt: Date
}

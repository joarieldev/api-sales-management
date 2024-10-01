import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Detail } from './Detail'

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 250, nullable: true, default: "" })
  description: string

  @Column({ type: 'float', nullable: false })
  price: number

  @Column({ type: 'int', nullable: false })
  stock: number

  @OneToMany(()=>Detail, (detail)=>detail.product)
  details: Detail[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

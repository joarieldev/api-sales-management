import { DataSource } from 'typeorm'
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from './config'
import { Employee } from './entities/Employee'
import { Customer } from './entities/Customer'
import { Product } from './entities/Product'
import { Sales } from './entities/Sales'
import { Detail } from './entities/Detail'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT??'0'),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  entities: [Employee, Customer, Product, Sales, Detail],
})

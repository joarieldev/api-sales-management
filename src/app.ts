import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routeCustomer from './routes/customer.route'
import routeEmployee from './routes/employee.route'
import routeProduct from './routes/product.route'
import routeSale from './routes/sale.route'
import routeDetail from './routes/detail.route'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api', routeCustomer)
app.use('/api', routeEmployee)
app.use('/api', routeProduct)
app.use('/api', routeSale)
app.use('/api', routeDetail)

export default app

import { Router } from 'express'
import {
  createCustomer,
  deleteCustomer,
  getCustomerByDni,
  getCustomers,
  updateCustomer,
} from '../controllers/customer.controller'

const router = Router()

router.post('/customers', createCustomer)
router.get('/customers', getCustomers)
router.get('/customers/:dni', getCustomerByDni)
router.put('/customers/:id', updateCustomer)
router.delete('/customers/:id', deleteCustomer)

export default router

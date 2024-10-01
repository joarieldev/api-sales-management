import { Router } from 'express'
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  signIn,
  updateEmployee,
} from '../controllers/employee.controller'

const router = Router()

router.post('/employees', createEmployee)
router.post('/signin', signIn)
router.get('/employees', getEmployees)
router.put('/employees/:id', updateEmployee)
router.delete('/employees/:id', deleteEmployee)

export default router

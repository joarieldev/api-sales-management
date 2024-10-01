import { Router } from 'express'
import {
  createProduct,
  getProducts,
  getProductFilterByName,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller'

const router = Router()

router.post('/products', createProduct)
router.get('/products', getProducts)
router.get('/products/filter/:name', getProductFilterByName)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router

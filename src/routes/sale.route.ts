import { Router } from "express"
import { createSale, getSales } from "../controllers/sale.controller"

const router = Router()

router.post('/sales', createSale)
router.get('/sales', getSales)

export default router
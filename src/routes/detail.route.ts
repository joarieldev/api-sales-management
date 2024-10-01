import { Router } from "express"
import { getDetailBySaleId, getDetails } from "../controllers/detail.controller"

const router = Router()

router.get('/details', getDetails)
router.get('/details/:saleId', getDetailBySaleId)

export default router
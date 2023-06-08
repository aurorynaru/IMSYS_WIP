import express from 'express'
import { registerProduct } from '../controllers/product.js'
import { registerUser } from '../controllers/auth.js'

const router = express.Router()

router.post('/product', registerProduct)
router.post('/user', registerUser)

export default router

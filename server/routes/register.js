import express from 'express'
import { registerProduct } from '../controllers/product.js'
import { registerUser } from '../controllers/auth.js'
import { registerClient } from '../controllers/client.js'
import { registerSupplier } from '../controllers/supplier.js'

const router = express.Router()

router.post('/product', registerProduct)
router.post('/user', registerUser)
router.post('/client', registerClient)
router.post('/supplier', registerSupplier)

export default router

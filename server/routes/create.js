import express from 'express'
import { createInvoice } from '../controllers/invoice.js'

const router = express.Router()

router.post('/invoice', createInvoice)

export default router

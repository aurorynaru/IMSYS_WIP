import express from 'express'
import { searchBrandName } from '../controllers/api.js'
import { searchSupplier } from '../controllers/api.js'
import { searchClient } from '../controllers/client.js'
import { searchProduct } from '../controllers/product.js'
import { searchInvoice } from '../controllers/invoice.js'
import { searchInvoiceById } from '../controllers/api.js'

const router = express.Router()

router.get('/brand/:name', searchBrandName)
router.get('/supplier/:name', searchSupplier)
router.get('/client/:name', searchClient)
router.get('/search', searchProduct)
router.get('/searchInvoice', searchInvoice)
router.post('/invoices', searchInvoiceById)

export default router

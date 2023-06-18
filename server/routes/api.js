import express from 'express'
import { searchBrandName } from '../controllers/api.js'
import { searchSupplier } from '../controllers/api.js'
import { searchClient } from '../controllers/client.js'

const router = express.Router()

router.get('/brand/:name', searchBrandName)
router.get('/supplier/:name', searchSupplier)
router.get('/client/:name', searchClient)

export default router

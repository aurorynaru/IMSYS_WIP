import { ObjectId } from 'mongodb'
import { Invoice } from '../models/Invoice.js'
import { Product } from '../models/Products.js'
import { Supplier } from '../models/Supplier.js'

export const searchBrandName = async (req, res) => {
    try {
        const { name } = req.params
        const regex = new RegExp(name, 'i')
        const brand = await Product.find({
            brand: { $regex: regex }
        })

        if (!brand) {
            return res.status(400).json('invalid brand name')
        }

        const brands = await Promise.all(
            brand.map(async (brand) => {
                if (brand.brand != 'none' && brand.brand != 'None') {
                    return {
                        id: brand._id.toString(),
                        name: brand.brand
                    }
                }
            })
        )

        res.status(200).json(brands)
    } catch (error) {
        return res.status(409).json({ error: error.message })
    }
}

export const searchSupplier = async (req, res) => {
    try {
        const { name } = req.params
        const regex = new RegExp(name, 'i')
        const supplier = await Supplier.find({
            name: { $regex: regex }
        })

        if (!supplier) {
            return res.status(400).json('invalid supplier name')
        }

        const suppliers = await Promise.all(
            supplier.map(async (name) => {
                if (name.name != 'none' && name.name != 'None') {
                    return {
                        id: name._id,
                        name: name.name
                    }
                }
            })
        )
        console.log(suppliers)
        res.status(200).json(suppliers)
    } catch (error) {
        return res.status(409).json({ error: error.message })
    }
}

export const searchInvoiceById = async (req, res) => {
    try {
        const invoiceArr = await Promise.all(
            req.body.map(async (id) => {
                return await Invoice.findById({ _id: new ObjectId(id) })
            })
        )

        res.status(200).json(invoiceArr)
    } catch (error) {
        return res.status(409).json({ error: error.message })
    }
}

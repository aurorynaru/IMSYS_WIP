import { Product } from '../models/Products.js'

export const registerProduct = async (req, res) => {
    try {
        const { custom_id, brand, description, quantity, price } = req.body
        // const product = await Product.findOne({ description })

        // if (product) {
        //     throw new Error('Duplicate product')
        // }

        const newProduct = new Product({
            custom_id,
            brand,
            description,
            quantity,
            price,
            temporary_quantity: quantity
        })
        const savedProduct = await newProduct.save()
        res.status(201).json({ product: savedProduct })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const searchProduct = async (req, res) => {
    try {
        const { minPrice, maxPrice, brand, page, limit, desc } = req.query

        const pageNumber = parseInt(page) || 1
        const limitNumber = parseInt(limit) || 10

        const filters = {}

        if (minPrice && !isNaN(minPrice)) {
            filters.price = { $gte: parseInt(minPrice) }
        }

        if (maxPrice && !isNaN(maxPrice)) {
            if (filters.price) {
                filters.price.$lte = parseInt(maxPrice)
            } else {
                filters.price = { $lte: parseInt(maxPrice) }
            }
        }

        if (brand) {
            filters.brand = brand
        }

        if (desc) {
            filters.desc = desc
        }

        const countPromise = Product.countDocuments(filters)
        const itemsPromise = Product.find(filters)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)

        const [count, items] = await Promise.all([countPromise, itemsPromise])

        res.json({
            items,
            totalItems: count,
            currentPage: pageNumber,
            totalPages: Math.ceil(count / limitNumber)
        })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

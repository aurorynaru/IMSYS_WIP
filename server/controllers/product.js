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

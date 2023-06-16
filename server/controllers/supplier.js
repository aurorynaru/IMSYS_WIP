import { Supplier } from '../models/Supplier.js'

export const registerSupplier = async (req, res) => {
    try {
        const { name, credit_limit, terms, address, tin } = req.body

        const backToNum = parseInt(credit_limit.replace(/,/g, ''))

        const newSupplier = new Supplier({
            name,
            credit_limit: backToNum,
            terms,
            address,
            tin
        })
        const savedSupplier = await newSupplier.save()
        res.status(201).json({ Supplier: savedSupplier })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

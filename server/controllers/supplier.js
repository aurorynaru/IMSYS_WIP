import { Supplier } from '../models/Supplier'

export const registerSupplier = async (req, res) => {
    try {
        const { name, credit_limit, terms, address, tin } = req.body

        const newSupplier = new Supplier({
            name,
            credit_limit,
            terms,
            address,
            tin
        })
        const savedSupplier = await newClient.save()
        res.status(201).json({ Supplier: savedSupplier })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

import { Client } from '../models/Clients.js'

export const registerClient = async (req, res) => {
    try {
        const { name, credit_limit, terms, address, tin } = req.body

        const backToNum = parseInt(credit_limit.replace(/,/g, ''))

        const newClient = new Client({
            name,
            credit_limit: backToNum,
            terms,
            address,
            tin
        })
        const savedClient = await newClient.save()
        res.status(201).json({ client: savedClient })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

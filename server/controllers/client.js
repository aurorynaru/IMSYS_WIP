import { Client } from '../models/Clients.js'

export const registerClient = async (req, res) => {
    try {
        const { name, credit_limit, terms, tin } = req.body

        const address = req.body.singleAddress || req.body.multipleAddress

        const backToNum = parseInt(credit_limit.replace(/,/g, ''))

        const isDuplicateTin = await Client.findOne({ tin: tin })

        if (isDuplicateTin) {
            return res.status(400).json({ error: 'duplicate tin number' })
        }

        const newClient = new Client({
            name,
            credit_limit: backToNum,
            terms,
            address,
            tin,
            credit_used: 0
        })
        const savedClient = await newClient.save()
        res.status(201).json({ client: savedClient })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const searchClient = async (req, res) => {
    try {
        const { name } = req.params
        const regex = new RegExp(name, 'i')
        const client = await Client.find({
            name: { $regex: regex }
        })

        if (!client) {
            return res.status(400).json('invalid client name')
        }

        const Clients = await Promise.all(
            client.map(async (name) => {
                if (name.name != 'none' && name.name != 'None') {
                    return {
                        id: name._id,
                        address: name.address,
                        name: name.name,
                        terms: name.terms,
                        credit_limit: name.credit_limit,
                        tin: name.tin,
                        credit_used: name.credit_used,
                        invoice: name.invoice
                    }
                }
            })
        )

        res.status(200).json(Clients)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

import { Invoice } from '../models/Invoice.js'
import { User } from '../models/User.js'
import { Client } from '../models/Clients.js'

export const createInvoice = async (req, res) => {
    try {
        const {
            date_created,
            invoice_number,
            client_id,
            address,
            description,
            purchase_order,
            user_id,
            recipient,
            vat,
            total_sales_vat_inclusive,
            less_vat,
            net_vat
        } = req.body
        const items = req.body

        const user = await User.findById({ _id: user_id })
        const client = await Client.findById({ _id: client_id })
        const { terms, tin, name } = client

        const newInvoice = new Invoice({
            net_vat,
            recipient,
            vat,
            total_sales_vat_inclusive,
            less_vat,
            invoice_number,
            date_created,
            items,
            address,
            description,
            purchase_order,
            user_id: user._id,
            client: client._id,
            terms,
            tin,
            name
        })

        const savedInvoice = await newInvoice.save()

        if (!savedInvoice) {
            throw new Error('internal server error')
        }

        res.status(201).json({ invoice: savedInvoice })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

import { Invoice } from '../models/Invoice.js'
import { User } from '../models/User.js'
import { Client } from '../models/Clients.js'
import { Product } from '../models/Products.js'

export const createInvoice = async (req, res) => {
    try {
        const {
            client,
            terms,
            tin,
            address,
            date_created,
            due_date,
            invoice_number,
            clientId,
            user_id,
            recipient,
            cost,
            status
        } = req.body
        const items = req.body

        const user = await User.findById({ _id: ObjectId(user_id) })
        if (!user) {
            throw new Error('invalid user')
        }
        const clientData = await Client.findById({ _id: ObjectId(clientId) })
        if (!clientData) {
            throw new Error('invalid client')
        }

        //must not be PO

        if (status != 'Pending Override') {
            //check item(s) availability
            items.map(async (item) => {
                const product = await Product.findById({
                    _id: ObjectId(item.id)
                })
                if (!product) {
                    throw new Error(
                        `Invalid product amount:${item.amount} description:${item.description} quantity: ${item.quantity}`
                    )
                }

                if (product.quantity < item.quantity) {
                    throw new Error(
                        `Product with description ${item.description} price: ${item.amount} has insufficient quantity, requesting ${item.quantity} out of ${product.quantity}`
                    )
                }
            })

            items.map(async (item) => {
                await Product.updateOne(
                    {
                        _id: ObjectId(item.id),
                        quantity: { $gte: item.quantity }
                    },
                    { $inc: { quantity: -item.quantity } }
                )
            })

            await Client.updateOne(
                {
                    _id: ObjectId(clientId),
                    credit_used: { $gte: cost.TotalAmountDue }
                },
                { $inc: { credit_used: cost.TotalAmountDue } }
            )
        }

        const newInvoice = new Invoice({
            recipient,
            invoice_number,
            date_created,
            due_date,
            items,
            cost: [cost],
            address,
            purchase_order,
            user_id: user._id,
            client: client._id,
            terms,
            tin,
            status
        })

        const savedInvoice = await newInvoice.save()

        const isCreatedUser = user.posted_invoice.map(
            (invoice) => invoice === savedInvoice._id
        )

        if (!isCreatedUser) {
            await User.findByIdAndUpdate(
                { _id: user._id },
                {
                    $push: {
                        posted_invoice: {
                            $each: [savedInvoice._id],
                            $position: 0
                        }
                    }
                },
                { new: true }
            )
        }

        const isCreatedClient = client.invoice.map(
            (invoice) => invoice === savedInvoice._id
        )
        if (!isCreatedClient) {
            await Client.findByIdAndUpdate(
                { _id: client._id },
                {
                    $push: {
                        invoice: {
                            $each: [savedInvoice._id],
                            $position: 0
                        }
                    }
                },
                { new: true }
            )
        }

        if (!savedInvoice) {
            throw new Error('internal server error')
        }

        res.status(201).json({ invoice: savedInvoice })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

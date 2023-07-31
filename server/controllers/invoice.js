import { Invoice } from '../models/Invoice.js'
import { User } from '../models/User.js'
import { Client } from '../models/Clients.js'
import { Product } from '../models/Products.js'
import { ObjectId } from 'mongodb'

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
            status,
            items
        } = req.body

        const user = await User.findById({ _id: new ObjectId(user_id) })
        if (!user) {
            throw new Error('invalid user')
        }
        const clientData = await Client.findById({
            _id: new ObjectId(clientId)
        })
        if (!clientData) {
            throw new Error('invalid client')
        }

        const dupeInvoice = await Invoice.findOne({ invoice_number })

        if (dupeInvoice) {
            throw new Error('Invoice number has already been used')
        }

        //must not be PO

        if (status != 'Pending Override') {
            //check item(s) availability
            items.map(async (item) => {
                const product = await Product.findById({
                    _id: new ObjectId(item.id)
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
                        _id: new ObjectId(item.id),
                        quantity: { $gte: item.quantity }
                    },
                    { $inc: { quantity: -item.quantity } }
                )
            })

            await Client.updateOne(
                {
                    _id: new ObjectId(clientId)
                },
                { $inc: { credit_used: cost.TotalAmountDue } }
            )
        }

        const newInvoice = new Invoice({
            clientName: clientData.name,
            recipient,
            invoice_number,
            date_created,
            due_date,
            vatableSales: cost.vatableSales,
            vat: cost.vat,
            totalAmountDue: cost.TotalAmountDue,
            items,
            address,
            user_id: user._id,
            client: clientData._id,
            terms,
            tin,
            status
        })

        const savedInvoice = await newInvoice.save()

        const isCreatedUser = user.posted_invoice.find(
            (invoice) => invoice === savedInvoice._id
        )

        const isCreatedClient = clientData.invoice.find(
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

        if (!isCreatedClient) {
            await Client.findByIdAndUpdate(
                { _id: clientData._id },
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

export const searchInvoice = async (req, res) => {
    try {
        const {
            address,
            client,
            invoice_number,
            minAmount,
            maxAmount,
            date_created,
            due_date,
            status,
            page,
            limit
        } = req.query

        const pageNumber = parseInt(page) || 1
        const limitNumber = parseInt(limit) || 1

        const filters = {}

        if (client) {
            const clientData = await Client.findOne({ name: client })

            if (clientData) {
                filters.name = { $regex: clientData.name, $options: 'i' }
            }
        }

        if (minAmount && !isNaN(minAmount)) {
            filters.totalAmountDue = { $gte: parseInt(minAmount) }
        }

        if (invoice_number && !isNaN(invoice_number)) {
            filters.invoice_number = parseInt(invoice_number)
        }

        if (maxAmount && !isNaN(maxAmount)) {
            if (filters.totalAmountDue) {
                filters.totalAmountDue.$lte = parseInt(maxAmount)
            } else {
                filters.totalAmountDue = {
                    $lte: parseInt(maxAmount)
                }
            }
        }

        if (address) {
            filters.address = { $regex: address, $options: 'i' }
        }

        if (status) {
            filters.status = { $regex: status, $options: 'i' }
        }

        if (date_created) {
            filters.date_created = { $gte: new Date(date_created) }
        }

        if (due_date) {
            filters.due_date = { $lte: new Date(due_date) }
        }

        let sortCriteria = {}

        // if (sortPrice === 'desc' && sortPrice != '') {
        //     sortCriteria.price = -1
        // } else if (sortPrice === 'asc') {
        //     sortCriteria.price = 1
        // }

        // if (sortQuantity === 'desc' && sortQuantity != '') {
        //     sortCriteria.quantity = -1
        // } else if (sortQuantity === 'asc') {
        //     sortCriteria.quantity = 1
        // }

        // if (sortBrand === 'desc' && sortBrand != '') {
        //     sortCriteria.brand = 'desc'
        // } else if (sortBrand === 'asc') {
        //     sortCriteria.brand = 'asc'
        // }

        // if (sortDesc === 'desc' && sortDesc != '') {
        //     sortCriteria.description = 'desc'
        // } else if (sortDesc === 'asc') {
        //     sortCriteria.description = 'asc'
        // }

        const countPromise = Invoice.countDocuments(filters)
        let invoicePromise = Invoice.find(filters)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .sort(sortCriteria)
            .collation({ locale: 'en', strength: 1 })

        const [count, invoices] = await Promise.all([
            countPromise,
            invoicePromise
        ])

        res.json({
            invoices,
            totalItems: count,
            currentPage: pageNumber,
            totalPages: Math.ceil(count / limitNumber)
        })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

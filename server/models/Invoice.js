import mongoose, { Schema } from 'mongoose'

const invoiceSchema = mongoose.Schema(
    {
        invoice_number: { type: Number, required: true },
        client: [{ type: Schema.Types.ObjectId, ref: 'clients' }],
        address: {
            type: String,
            required: true
        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            }
        ],
        date_created: {
            type: Date,
            required: true
        },
        terms: {
            type: Number,
            required: true
        },
        recipient: {
            type: String
        },
        vatable_sales: {
            type: Number,
            required: true
        },
        vat: {
            type: Number,
            required: true
        },
        total_sales_vat_inclusive: {
            type: Number,
            required: true
        },
        less_vat: {
            type: Number,
            required: true
        },
        net_vat: {
            type: Number,
            required: true
        },
        total_amount_due: {
            type: Number,
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        delivery_receipt:{
            type:Schema.Types.ObjectId, ref: 'delivery_receipts'
        },
        edited_by: [{ type: Schema.Types.ObjectId, ref: 'users', default: [] }],
        status: {
            type: String,
            enum: ['Paid', 'Pending', 'Pending Override', 'Returned','Cancelled', 'To follow'],
            default: 'Pending'
        }
    },
    { timestamps: true }
)

export const Invoice = mongoose.model('invoice', invoiceSchema)

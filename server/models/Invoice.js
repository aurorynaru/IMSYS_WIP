import mongoose, { Schema } from 'mongoose'

const invoiceSchema = mongoose.Schema(
    {
        invoice_number: { type: Number, required: true },
        client: { type: Schema.Types.ObjectId, ref: 'clients' },
        clientName: { type: String },
        address: {
            type: String,
            required: true
        },
        items: { type: Array, required: true },
        vatableSales: { type: Number },
        totalAmountDue: { type: Number },
        vat: { type: Number },
        date_created: {
            type: Date,
            required: true
        },
        due_date: {
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
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        delivery_receipt: {
            type: Schema.Types.ObjectId,
            ref: 'delivery_receipts'
        },
        posted_by: { type: Schema.Types.ObjectId, ref: 'users' },
        edited_by: [{ type: Schema.Types.ObjectId, ref: 'users', default: [] }],
        isBeingEdited: {
            type: Boolean,
            default: false
        },
        editedBy: { type: Schema.Types.ObjectId, ref: 'users' },
        status: {
            type: String,
            enum: [
                'Paid',
                'Pending',
                'Pending Override',
                'Returned',
                'Cancelled',
                'To follow'
            ],
            default: 'Pending'
        }
    },
    { timestamps: true }
)

export const Invoice = mongoose.model('invoice', invoiceSchema)

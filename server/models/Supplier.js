import mongoose, { Schema } from 'mongoose'

const supplierSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        credit_limit: {
            type: Number,
            required: true
        },
        terms: {
            type: Number,
            required: true
        },
        tin: {
            type: String,
            required: true
        },
        products: [
            { type: Schema.Types.ObjectId, ref: 'products', default: [] }
        ],
        isBeingEdited: {
            type: Boolean,
            default: false
        },
        editedBy: [
            {
                type: Schema.Types.ObjectId
            }
        ]
    },
    { timestamps: true }
)

export const Supplier = mongoose.model('suppliers', supplierSchema)

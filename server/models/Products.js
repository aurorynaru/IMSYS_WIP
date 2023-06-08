import mongoose, { Schema } from 'mongoose'

const productsSchema = mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            default: 'None'
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        purchased_from: {
            type: Schema.Types.ObjectId,
            ref: 'clients'
        },
        temporary_quantity: {
            type: Number,
            required: true
        },

        custom_id: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export const Product = mongoose.model('products', productsSchema)

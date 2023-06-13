import mongoose, { Schema } from 'mongoose'

const purchase_order_Schema = mongoose.Schema(
    {
        purchase_from: {
            type: Schema.Types.ObjectId,
            required: true
        },
        delivered_to: {
            type: Schema.Types.ObjectId,
            required: true
        },
        items: {
            type: String,
            required: true
        },
        purchase_order_id: {
            type: String,
            required: true
        },

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

export const Purchase_order = mongoose.model('users', purchase_order_Schema)

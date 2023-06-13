import mongoose, { Schema } from 'mongoose'

const deliveryReceiptsSchema = mongoose.Schema(
    {
        delivery_receipt: {
            type: Schema.Types.ObjectId
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

export const Delivery_receipt = mongoose.model(
    'delivery_receipts',
    deliveryReceiptsSchema
)

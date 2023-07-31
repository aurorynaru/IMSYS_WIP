import mongoose, { Schema } from 'mongoose'

const clientSchema = mongoose.Schema(
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

        credit_used: {
            type: Number
        },
        terms: {
            type: Number,
            required: true
        },
        tin: {
            type: String,
            required: true
        },
        address: {
            type: Array,
            required: true
        },
        invoice: [{ type: Schema.Types.ObjectId, ref: 'invoice', default: [] }],
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

export const Client = mongoose.model('clients', clientSchema)

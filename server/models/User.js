import mongoose, { Schema } from 'mongoose'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },

        avatar: [
            {
                type: Array,
                default: []
            }
        ],
        posted_invoice: [
            { type: Schema.Types.ObjectId, ref: 'invoice', default: [] }
        ],
        revised_invoice: [
            { type: Schema.Types.ObjectId, ref: 'invoice', default: [] }
        ],
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export const User = mongoose.model('users', userSchema)

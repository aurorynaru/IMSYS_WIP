import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { username, password, first_name, last_name } = req.body
        console.log(req.body)
        const salt = await bcrypt.genSalt()
        const hashPass = await bcrypt.hash(password, salt)

        const newUser = await User({
            username,
            password: hashPass,
            first_name,
            last_name
        })

        const savedUser = await newUser.save()

        res.status(201).json({ user: savedUser })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username: username })

        if (!user) {
            throw new Error('incorrect username / password')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error('username / password does not match')
        }

        const token = jwt.sign({ id: username._id }, process.env.JWT_SECRET)

        delete user.password
        let userData = {}
        for (const key in user) {
            if (
                key === 'first_name' ||
                key === 'last_name' ||
                key === 'isAdmin' ||
                key === 'createdAt' ||
                key === 'id' ||
                key === 'posted_invoice' ||
                key === 'revised_invoice' ||
                key === 'username' ||
                key === 'avatar'
            ) {
                userData[key] = user[key]
            }
        }
        res.status(200).json({ token, userData })
    } catch (error) {
        return res.status(409).json({ error: error.message })
    }
}

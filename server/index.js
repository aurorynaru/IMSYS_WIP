import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'

//route imports

import createRoutes from './routes/create.js'
import registerRoutes from './routes/register.js'
import authRoutes from './routes/auth.js'
import apiRoutes from './routes/api.js'
const app = express()
dotenv.config()
app.use(cors())
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json({ limit: '30mb', extended: 'true' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: 'true' }))

const URL = process.env.MONGO_URL
const PORT = process.env.PORT

//routes
app.use('/', authRoutes)
app.use('/register', registerRoutes)
app.use('/create', createRoutes)
app.use('/api', apiRoutes)

// PORT,'0.0.0.0'
mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Listening on port:${PORT}`)
        })
    })
    .catch((err) => {
        console.log(`error: ${err}`)
    })

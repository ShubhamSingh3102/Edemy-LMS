// basic express server
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoutes.js'

// Initialise express
const app = express()

// Connect to database
await connectDB()

// Connecting to cloudinary
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())   // provide auth property in all the request
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)  // Route for educator
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Port
const PORT = process.env.PORT || 5000

// run the application on the port number
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
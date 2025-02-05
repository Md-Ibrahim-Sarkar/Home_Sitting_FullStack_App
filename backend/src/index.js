import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import authRouter from './routes/auth.route.js';
import servicesRouter from './routes/service.route.js';
import bookedRouter from './routes/booked.route.js';
import favoriteRouter from './routes/favorite.route.js';
import cookieParser from 'cookie-parser';


// this
import path from "path"

dotenv.config()
const app = express();
const port = process.env.LOCAL_DB_HOST


// this
const __dirname = path.resolve()


app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}))
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/service', servicesRouter)
app.use('/api/booking', bookedRouter)
app.use('/api/favorite', favoriteRouter)

// this 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    app.sendFile(path.join(__dirname, "../frontend/dist", "dist", "index.html"))
  })
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
})

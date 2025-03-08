import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js'; // MongoDB Connect Function
import authRouter from './routes/auth.route.js';
import productsRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';
import favoriteRouter from './routes/favorite.route.js';
import categoryRouter from './routes/category.route.js';
import cartRouter from './routes/cart.route.js';
import Newsletter from './models/newslatter.model.js';
import settingsRouter from './routes/settingsRoutes.js';
import contactRouter from './routes/contact.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://client-01-e-commerce.pages.dev', 'https://e-commerce-pi-pied.vercel.app'],
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/order', orderRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/contact', contactRouter);

app.use('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const existingEmail = await Newsletter.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const newsletter = await Newsletter.create({ email });
  if (newsletter) {
    res.status(200).json({ message: 'Email received' });
  } else {
    res.status(400).json({ message: 'Email not received' });
  }
});

// Database Connection & Server Start
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection failed!", err);
});

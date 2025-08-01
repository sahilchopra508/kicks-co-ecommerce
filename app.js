const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./server/config/db');
const productRoutes = require('./server/routes/products');

const app = express();
const PORT = 5000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
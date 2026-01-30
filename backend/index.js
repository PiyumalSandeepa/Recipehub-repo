const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Test backend
app.get('/', (req, res) => res.send('Backend is running'));

// Mount routes
app.use('/api/users', userRoutes);       // ✅ Now signup/login = /api/users/signup & /api/users/login
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

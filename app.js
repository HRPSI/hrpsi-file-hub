require('dotenv').config(); // Load environment variables from .env if present
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration (in-memory for demonstration, use a persistent store in production)
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.use('/', authRoutes);       // for login, logout
app.use('/files', fileRoutes);  // for dashboard, listing, uploading

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

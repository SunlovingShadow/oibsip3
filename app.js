const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define your routes here
app.get('/', (req, res) => {
  // You can pass data to your EJS template here if needed
  res.render('index');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

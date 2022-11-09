const express = require('express');
const app = express();

// Global variables
const PORT = process.env.port || 3500;

// Built-in middleware for json
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ "error": "404 Not Found"});
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
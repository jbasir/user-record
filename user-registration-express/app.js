const express = require('express');
const cors = require('cors');
const recordRoutes = require('./src/routes/recordRoutes');

const app = express();

app.use(express.json(), cors());
app.use('/uploads', express.static('uploads'));

app.use('/api', recordRoutes);

app.get('/', (req, res) => {
  res.send('it works!');
});

module.exports = app;
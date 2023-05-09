const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Tanakan API Services.');
});

app.listen(3000, () => {
    console.log('Start server at port 3000.');
});

module.exports = app;
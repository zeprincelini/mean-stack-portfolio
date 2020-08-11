//package includes
const express = require('express');
const bodyParser = require('body-parser');
//js includes
const api = require('./routes/api');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('hello from the server');
});

app.listen(PORT, () => {
    console.log('runing on port: ', PORT);
});
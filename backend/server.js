//package includes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//js includes
const api = require('./routes/api');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
// app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // next();
// });

app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('hello from the server');
});

app.listen(PORT, () => {
    console.log('running on port: ', PORT);
});
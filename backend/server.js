//package includes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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

app.use((req, res, next) => {
    res.setHeader('Connection', 'open');
    next();
});

app.use(bodyParser.json());
//app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/myportfolio', 'index.html'));
});

app.use((req, res, next) => {
    const error = new Error('not uploaded');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log('running on port: ', PORT);
});

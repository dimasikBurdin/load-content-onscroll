const db = require('./database.json');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send('fuck');
})

app.get('/data', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(db));
        console.log('data send')        
    }, 1110);
})

app.listen(port, () => {
    console.log(`this port on ${port}`)
})
const db = require('./database.json');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/start.html'))
})

app.get('/all-data', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(db));
        console.log('data send')        
    }, 1110);
})

// req -> (startIndex, countItems)
app.post('/limited-data', (req, res) => {
    let copyDb = [...db];
    copyDb = copyDb.splice(req.body.startIndex, req.body.countItems);
    setTimeout(() => {
        res.send(JSON.stringify(copyDb))
        console.log('send limited data', req.body.startIndex, req.body.countItems)
        
    }, Math.random() * 1000);
})

app.listen(port, () => {
    console.log(`this port on ${port}`)
})
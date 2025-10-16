const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    // res.send(req.query["name"])
    res.send("Server is ready ")
})
app.post('/save-record', (req, res) => {
    console.log("UserName and Result from Frontend");
    console.log(req.body);
    res.json({ received: req.body });
    data = req.body
    fs.appendFileSync(
        path.join(__dirname, 'data.txt'),
        JSON.stringify(data) + '\n',
        'utf-8'
    );
})
app.listen(port, () => {
    console.log(`Server is running at Port:${port}`)
})
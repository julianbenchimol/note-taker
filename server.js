const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
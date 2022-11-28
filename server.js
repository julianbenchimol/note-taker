const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/db.json');

const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HTML Routes
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
})
//=========================
//API Routes
app.get('/api/notes', (req,res)=>{
    res.json(db);
})
//Post Route
app.post('/api/notes', (req, res)=>{
    console.info(`${req.method} request recieved to add a new note`);
    const response = req.body;
    if(response.title && response.text){
        res.json(`${response.title} note has been added \n Note Text: ${response.text}`);
    }
    else{
        res.json('Note needs a title and a body text!');
    }

    console.log(response);
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
const { urlencoded } = require('express');
const express = require('express');
const { json, type } = require('express/lib/response');
const { fstat } = require('fs');
const path = require('path');
const app = express();
const db = require('./db/db.json');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HTML Routes
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
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
    const {title, text} = req.body;

    //checks if note has title and body text
    if(title && text){
        const {title, text} = req.body;
        const newNote = {title,
                        text,
                        id: uuidv4()
                    };

        fs.readFile('./db/db.json', 'utf8', function(error, data){
            if(error){throw error}

            let dataArray = JSON.parse(data);
            dataArray.push(newNote);
            dataArray = JSON.stringify(dataArray);

            fs.writeFile('./db/db.json', `${dataArray}\n`, (err)=>{
                if(err){throw err}
                res.json(`New Note added`);
            })

        })
    }
    //returns when missing title or text
    else{
        res.json('Note needs a title and a body text!');
    }
})

app.listen(PORT, () =>
  console.log(`Example app listening at ${PORT}`)
);
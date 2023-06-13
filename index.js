const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')  //Express package for api call on local host


connectToMongo();
const app = express()
const port =5000  // to give spacre for front end
const path = require('/login');


//middleware
app.use(express.json())

app.use(cors()) //package

// app.get('/', (req, res) => {
//     res.send('Hello Yash Bhau')
// })

//heating help created apis 
//available routes
app.use('/api/auth',require('./routes/auth')) 
app.use('/api/notes',require('./routes/notes'))


//serving frontend
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
    res.status(500).send(err);
    }
    );
});

//

app.listen(port, () => {
    console.log(`iNotebook app listening at http://localhost:${port}`)
})
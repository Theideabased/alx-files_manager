import express, { application } from 'express'
const index = require('./routes/index')
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/',index)

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
        console.log("Server listening on port", PORT);
})

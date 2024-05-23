import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import morgan from "morgan";

var bandName = ""

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(bodyParser.urlencoded({extended: true}))

function logger (req, res, next) {
    console.log("Request Method: ", req.method);
    console.log("Reqeust URL: ", req.url);
    next()
}


function bandNameGenerator (req, res, next) {
    console.log(req.body);
    bandName = req.body.street + " " + req.body.pet;
    next();
}






app.use(logger);
app.use(bandNameGenerator)


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
  
})

app.post('/submit', function (req, res) {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <title>YOUR BAND NAME IS:...</title>
    </head>
    <body>
    
        <div class="container">
            <h1 class="h1">Your band name is: </h1>
            <h2 class="display-5"> ${bandName} </h2>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>
    </html>`)
    // console.log(bandName)
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
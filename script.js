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
    res.render("submit.ejs", 
        {name: bandName}
    )
    // console.log(bandName)
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

var express = require('express')
var app = express()

const merchant = require("./routes/merchant");
const product = require("./routes/product");
const port = 3000

app.use(express.json())
function middleware(err, req, res, next) {
    console.log('Time: ', Date.now())
    if (err !== undefined) {
        res.status(500).send("error: middleware "+err)
    }
    next()
}

app.use(middleware)



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

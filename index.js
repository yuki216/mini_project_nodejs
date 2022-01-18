
var express = require('express')
var morgan = require('morgan')
var app = express()

const merchant = require("./app/routes/merchant");
const product = require("./app/routes/product");
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

app.use(merchant)
app.use(product)
morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  })
  
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

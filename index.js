
var express = require('express')
var morgan = require('morgan')
var cors = require('cors')
var app = express()

const merchant = require("./app/routes/merchant");
const product = require("./app/routes/product");
const cookieParser = require('cookie-parser');
const port = 3001

app.use(express.json())

app.use(cors())
app.use(cookieParser());
app.use("/api/merchants",merchant)
app.use("/api/products",product)
morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
})
  
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

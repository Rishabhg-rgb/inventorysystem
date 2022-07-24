const express = require('express')
const app = express()
const connectToMongo =  require('./db')
const cors = require('cors')
connectToMongo()
app.use(express.json())
app.use(cors())
app.use('/user',require('./routes/auth'))
app.use('/category',require('./routes/categories'))
app.use('/product',require('./routes/product'))

app.listen(5000,()=>{
    console.log("server started")
    
})
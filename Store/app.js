require('dotenv').config()
const express = require('express')
const product = require('./routes/products')
const app = express()
const ConnectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
//middleware
app.use(express.static('./public'))
app.use(express.json())
//route
app.use('/api/v1/products',product)
app.use(notFound)


const port = process.env.PORT || 3000
const start = async()=>{
    try {
        await ConnectDB(process.env.mongo)
        app.listen(port,()=>console.log(`server is listening to port ${port}....`))
    } catch (error) {
        console.log("error")
    }
}
start()
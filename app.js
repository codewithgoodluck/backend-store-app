require('dotenv').config();
// aysn erros
require('express-async-errors')

const express = require('express')
const app = express();
const connectDB = require('../starter/db/connect')
const productRouter = require('../starter/routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errosMiddleware = require('./middleware/error-handler')
/// middleware

app.use(express.json())

// routes
app.get('/', (req,res)=>{
    res.send('<h1>Stroe API </h1><a href="/api/v1/products>products route</a>"')
})
app.use('/api/v1/products', productRouter)



// products route

app.use(notFoundMiddleware)
app.use(errosMiddleware)

const port = process.env.PORT || 3000

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listeniing to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

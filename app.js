require('dotenv').config()



const express = require('express')
const app = express()


const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(express.json())

app.get('/',(req,res) => {
    res.send('e-commerce api')
})

app.use(notFoundMiddleware)
app.use(errorHandler)

const port = process.env.PORT || 5000
const start  = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)        
    }
}

start()

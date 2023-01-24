const express=require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT =process.env.PORT || 5000

const app = express()

//Rate limiting

const limiter =rateLimit({
    windowMs: 10 * 60* 1000, //10 mins
    max: 100,
})

app.use(limiter)
app.set('trust proxy', 1)

//Set static folder
app.use(express.static('public'))
//Routes
const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+symbol+"&datatype=csv'

app.get("/public", async(req, res, next)=>{
   const result = await axios.get(url,{
    headers:{
        'X-RapidAPI-Key':process.env.API_KEY
    }
   })
})
app.use('/api', require('./routes'))
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


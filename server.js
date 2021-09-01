const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan') // logs middleware yarn add morgan --dev
const app = express()
const secureApi = require('helmet')
const userRoute = require('./routers/users')
const mongooseClient = require('mongoose')
mongooseClient.connect('mongodb://localhost/nodejsapi').then(() => {
  console.log('Connected Success !');
})
  .catch((error) => {
    console.log(error + "Loi connect");
  })


//Middleware
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(secureApi())
//Routes
app.use('/users', userRoute)
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK !"
  })
})
//Catch 404 Errors 
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

//Error Function Handle

app.use((err, next) => {
  const error = app.get('env') === 'dev' ? err : {}
  const status = err.status || 500 // 500 loi chua bat duoc
  // response to client
  return res.status(status).json({
    error: {
      message: error.message
    }
  })
})
//Start Server
const port = app.get('port') || 8000
app.listen(port, () => console.log(`Server listioning port ${port} `))

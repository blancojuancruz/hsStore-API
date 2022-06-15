const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const conectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// connect to mongoDB

mongoose.connect(conectionString)
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

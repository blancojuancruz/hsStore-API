const mongoose = require('mongoose')
const conectionString = process.env.MONGO_DB_URI

// connect to mongoDB

mongoose.connect(conectionString)
  .then(() => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log(err)
  })

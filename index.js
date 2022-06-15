require('dotenv').config()
require('./mongoDB')

const express = require('express')
const app = express()
const cors = require('cors')
const Product = require('./models/Products')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>REST API for an E-ccomerce </a></h1>')
})

app.get('/api/products', (request, response) => {
  Product.find({})
    .then(products => {
      response.json(products)
    })
})

app.get('/api/products/:id', (request, response, next) => {
  const { id } = request.params

  Product.findById(id)
    .then(product => {
      product ? response.json(product) : response.status(404).end()
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/products/:id', (request, response, next) => {
  const { id } = request.params
  const product = request.body

  const newProductInfo = {
    productName: product.productName,
    productPrice: product.productPrice,
    productImg: product.productImg,
    stock: product.stock,
    rebate: typeof product.rebate !== 'undefined' ? product.rebate : false
  }

  Product.findByIdAndUpdate(id, newProductInfo, { new: true })
    .then(result => {
      response.json(result)
    })
})

app.delete('/api/products/:id', (request, response, next) => {
  const { id } = request.params
  Product.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/products', (request, response) => {
  const product = request.body

  const newProduct = new Product({
    productName: product.productName,
    productPrice: product.productPrice,
    productImg: product.productImg,
    stock: product.stock,
    rebate: typeof product.rebate !== 'undefined' ? product.rebate : false
  })

  newProduct.save().then(savedProduct => {
    response.json(savedProduct)
  })
})

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }

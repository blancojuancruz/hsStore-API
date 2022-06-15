const mongoose = require('mongoose')
const supertest = require('supertest')

const { app, server } = require('../index')
const Product = require('../models/Products')
const { initialProducts } = require('./helpers')

const api = supertest(app)

beforeEach(async () => {
  await Product.deleteMany({})

  const firstProduct = new Product(initialProducts[0])
  await firstProduct.save()

  const secondProduct = new Product(initialProducts[1])
  await secondProduct.save()

  const thirdProduct = new Product(initialProducts[2])
  await thirdProduct.save()
})

test('products are returned as json', async () => {
  await api
    .get('/api/products')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 3 products', async () => {
  const response = await api.get('/api/products')
  expect(response.body).toHaveLength(initialProducts.length)
})

test('some product with the name Mother Gigabyte GA-A320M-S2H Ryzen', async () => {
  const response = await api.get('/api/products')

  const names = response.body.map(product => product.productName)
  expect(names).toContain('Mother Gigabyte GA-A320M-S2H Ryzen')
})

test('new product post', async () => {
  const newProduct = {
    productName: 'Mi nueva pc',
    productPrice: '179.319',
    productImg: 'https://instagram.com',
    stock: 25,
    rebate: false
  }

  await api
    .post('/api/products')
    .send(newProduct)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/products')

  const contents = response.body.map(product => product.productName)

  expect(response.body).toHaveLength(initialProducts.length + 1)

  expect(contents).toContain(newProduct.productName)
})

test('product without name is not added', async () => {
  const newProduct = {
    productName: '',
    productPrice: '',
    productImg: '',
    stock: ''
  }

  await api
    .post('/api/products')
    .send(newProduct)
    .expect(400)

  const response = await api.get('/api/products')

  expect(response.body).toHaveLength(initialProducts.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

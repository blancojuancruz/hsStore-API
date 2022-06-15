const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  productName: String,
  productPrice: String,
  productImg: String,
  stock: Number,
  rebate: Boolean
})

productSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id
    delete returnedObjet._id
    delete returnedObjet.__v
  }
})

const Product = model('Product', productSchema)

module.exports = Product

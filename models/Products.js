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

// const product = new Product({
//   productName: 'Webcam Logitechc 922 Pro Stream Usb Amr',
//   productPrice: 10.890,
//   productImg: 'https://www.venex.com.ar/products_images/1510063639_sdgsdg.png',
//   stock: 13,
//   rebate: true
// })

// product.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.log(err)
//   })

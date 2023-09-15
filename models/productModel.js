const mongoose = require('mongoose');
// Create a schema 
const productSchema = mongoose.Schema(
    {
        // Fiels name with object
       name:{
         type:String,
         required : [true, "Please enter a product name"]
       },
       quantity:{
         type: Number,
         required : true,
         default: 0
       },
       price:{
        type:Number,
        required:true
       },
       image:{
        type:String,
        required:false
       }

    },
    // timestamps gives two thing when the data is created and updated
    {
        timestamps:true
    }
)

const product = mongoose.model('product',productSchema);
module.exports = product;
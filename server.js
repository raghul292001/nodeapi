const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();


app.use(express.json());
//Routes
app.get('/',(req,res)=>{
 res.send('Hello This is Node Api')
})
app.get('/blog',(req,res)=>{
 res.send('Hello Blog My Name is Raghu')
})
// Create a data in db
app.post('/products',async(req,res)=>{
  try{
     const product= await Product.create(req.body)
     res.status(200).json(product)
 
  } catch(error){
     console.log(error.message);
     res.status(500).json({message:error.message})
  }
 })
//Get all the data in db
app.get('/products',async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product)

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
//Get a data by id 
app.get('/products/:id',async(req,res)=>{
  try{
    const {id}=req.params
    const product=await Product.findById(id);
    res.status(200).json(product)
  }catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message});
  }
})
//Update a data in db by id 
app.put('/products/:id', async(req,res)=>{
  try{
    const {id}=req.params
    const product=await Product.findByIdAndUpdate(id,req.body);
    // We Cannot find any product in database 
    if(!product){
      return res.status(404).json({message:`cannot find any product with ID${id}`})
    }
    const updateProduct = await Product.findById(id)
    res.status(200).json(updateProduct)
  }catch(error){
    res.status(500).json({message:error.message})
  }

})
//Delete the data from db
app.delete('/products/:id', async(req,res)=>{
  try{
    const {id}=req.params
      const product=await Product.findByIdAndDelete(id,req.body)
      if(!product){
      return res.status(404).json({message:`Cannot find any product with ID ${id}`})
      }
      res.status(200).json(product)
  }catch(error){
    res.status(500).json({message:error.message})
  }

})
mongoose.set('strictQuery',false) // Use to avoid the unnessary error
mongoose.connect('mongodb+srv://admin:admin@nodeapi.lfjkfvz.mongodb.net/Node-API')
.then(()=>{
    app.listen(3000,()=>{
        console.log('node api app is running in port 3000')
    })
    console.log('Connected To MongoDB')
}).catch((error)=>{
    console.log(error)
})
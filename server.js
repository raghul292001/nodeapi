const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();


app.use(express.json());
//Routes
app.get('/',(req,res)=>{
 res.send('Hello This is Node Api')
})
app.get('/blog',(req,res)=>{
 res.send('Hello Blog My Name is Raghu')
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
mongoose.set('strictQuery',false)
mongoose.connect('mongodb+srv://admin:admin@nodeapi.lfjkfvz.mongodb.net/Node-API')
.then(()=>{
    app.listen(3000,()=>{
        console.log('node api app is running in port 3000')
    })
    console.log('Connected To MongoDB')
}).catch((error)=>{
    console.log(error)
})
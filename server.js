const express = require('express');
const app = express();
app.get('/',(req,res)=>{
 res.send('Hello This is Node Api')
})
app.listen(3000,()=>{
    console.log('node api app is running in port 3000')

})
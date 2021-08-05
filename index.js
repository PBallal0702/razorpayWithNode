const { response } = require('express');
const express = require('express');
const Razorpay = require('razorpay');

let app = express();

app.set('views','views');
app.set('view engine','ejs');
var orderID;
const razorpay = new Razorpay({
    key_id:'rzp_test_3fI4CZD2YWbzRN',
    key_secret:'BLgkpynxdiocaPoIInpH5bdn'
})

app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.render('razorpay.ejs');
})

app.post('/order',(req,res)=>{
    var userDetail ={
        username:"testing",
    }
    var options = {
        amount: 50 *100,  // amount in the smallest currency unit
        currency: "INR"
      };
      razorpay.orders.create(options, function(err, order) {
        var createresObj ={
            order:order,
            userdetail:userDetail
        }
        res.json(createresObj);
      });
});
app.post('/order-verify/:username',(req,res)=>{
    console.log("req.params",req.params.username);
    console.log("req.body",req.body)
    res.send("Payment successfull")
})

app.listen(3000,(req,res)=>{
    console.log("woring on 3000")
})
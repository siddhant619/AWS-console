const express=require('express')
const fs=require('fs')
const app= express()
var AWS = require('aws-sdk');
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'));

// Import the Amazon S3 service client
/* const S3 = require("@aws-sdk/client-s3"); 
// Create an S3 client in the us-west-1 Region
const s3Client = new S3.S3Client({
    region: "us-west-1"
  });

console.log(s3Client) */

app.get("/",(req,res)=>{
    console.log('in /')
    const data=[{name:'demoVPC1', id:'sdfwef3j4j3', cidr:'10.0.0.0/24' },
                {name:'myVPC', id:'smbnmef99j3', cidr:'10.0.1.0/24' }]
    res.render('index.ejs', {data});

})

app.listen(3000,()=>{
    console.log('listening on port 3000...');
})


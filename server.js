const express= require('express');
const app=express();
const bodyPerser= require('body-parser');
const multer= require('multer');
require("dotenv").config();



//middlewares
app.use(express.static('public'));
app.use(bodyPerser.json());









//sec-a
//query
app.post('/one', function (req,res){
    let firstName= req.query.firstName;
    let lastName= req.query.lastName;
    res.send(firstName+" "+lastName);
})

//form-data body
app.post("/two",multer().array(),function (req,res){
    let JSONData= req.body;
    let JSONString= JSON.stringify(JSONData);
    res.send(JSONString);
})

//JSON Body
app.post("/three",function (req,res){
    let JSONData= req.body;
    let JSONString= JSON.stringify(JSONData);
    res.send(JSONString);
})

//Header
app.post('/four', function (req,res){
    let userName= req.header('userName');
    let password= req.header('password');
    res.send('User Name: '+userName+" "+'Password: '+password);
})






// sec-b
// jpg png file upload
const storage= multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "./uploads")
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
        cb(null, true);
    }else {
        cb(null, false)
        return cb(new Error());
    }
}

const upload= multer({storage:storage, limits:{fileSize: 1024*1024*5},fileFilter:fileFilter}).single("myFile");



app.post('/five', function (req,res){
    upload(req,res,function (err){
        if(err){
            res.send('file upload failed');
        }else {
            res.send('file upload succed');
        }
    })
})

// sec-c
// download from application directory
const {downloads}=require("./application/download");
app.get('/six',downloads);



const port = process.env.PORT || 8020;

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
});
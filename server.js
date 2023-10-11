const express=require("express");
const app=express();
const client=require("mongodb").MongoClient;
app.set("view engine","ejs");
//app.set("views","")
//client.connect("mongodb://127.0.0.1:27017",(err,data)=>{

//});
let dbinstance;
client.connect("mongodb+srv://userroo:Password4001@cluster0.1l8v68r.mongodb.net/?retryWrites=true&w=majority").then((database)=>{
  dbinstance= database.db("project")
console.log("Database connected...")
}).catch((err)=>{

    console.log("Unable to connect...")
})

app.get("/getdata",(req,res)=>{

    dbinstance.collection("students").find({}).toArray().then((response)=>{
        //console.log(response);
       // res.end();
       res.render("home",{data:response});
    })
})
//  /signup?name=adas&city=asdas
app.get("/signup",(req,res)=>{

    let obj={};
    obj.name=req.query.name;
    obj.city=req.query.city;
    dbinstance.collection("students").insertOne(obj).then((response)=>{
        console.log(response);
        res.end();

    })

})
app.listen(3000,(err)=>{
    console.log("Started...")
})
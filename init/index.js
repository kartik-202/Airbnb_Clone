const express=require("express");

const mongoose=require("mongoose");
const initdata=require("./data.js");

const listing = require("../models/listing.js");


const mongo_url="mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
    console.log("connected with db")
})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB=async()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({
        ...obj,owner:"667daf190a549867b23cd39c"
    }))
    await listing.insertMany(initdata.data);
    console.log("data initialized");
}

initDB();

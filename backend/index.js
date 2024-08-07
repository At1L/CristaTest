const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const cors = require("cors")
const helmet = require('helmet');

const app = express();
const corsOptions = {
    // только с источника http://localhost:3000 разрешены запросы
      origin: ['http://localhost:3000', 'https://localhost:3000'],
    };
// включаем валидацию запросов чтоб проходить проверку cors
app.use(cors(corsOptions));
// подключаем автоматический парсинг json
app.use(express.json());     
// настраиваем заголовки
app.use(helmet())

const uri = "mongodb+srv://testUser:test@testcrista.qasifp7.mongodb.net/?retryWrites=true&w=majority&appName=TestCrista"
const mongoClient = new MongoClient(uri);
   
(async () => {
     try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("testDB").collection("cars");
        app.listen(4000);
        console.log("THe server is up and running...");
    }catch(err) {
        return console.log(err);
    } 
})();
   
app.get("/api/cars", async(req, res) => {
           
    const collection = req.app.locals.collection;
    try{
        const cars = await collection.find({}).toArray();
        res.send(cars);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }  
});
      
app.post("/api/cars", async(req, res)=> {
          
    if(!req.body) return res.sendStatus(400);
    
    const carManufacturer = req.body.manufacturer;
    const carModel = req.body.model;
    const carYear = req.body.year;
    const carPrice = req.body.price;
    const car = {manufacturer: carManufacturer, model: carModel, year: carYear, price: carPrice};
          
    const collection = req.app.locals.collection;
       
    try{
        await collection.insertOne(car);
        res.send(car);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
       
app.delete("/api/cars/:id", async(req, res)=>{
           
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const car = await collection.findOneAndDelete({_id: id});
        res.send(car);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
      
app.put("/api/cars", async(req, res)=>{
           
    if(!req.body) return res.sendStatus(400);
    const carManufacturer = req.body.manufacturer;
    const carModel = req.body.model;
    const carYear = req.body.year;
    const carPrice = req.body.price;
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.body.id);
        const car = await collection.findOneAndUpdate({_id: id}, { $set: {manufacturer: carManufacturer, model: carModel, year: carYear, price: carPrice}},
         {returnDocument: "after" });
        if(car) res.send(car);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
    
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
       
    await mongoClient.close();
    console.log("The server is down");
    process.exit();
});
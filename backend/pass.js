import express from "express"
import cors from "cors"
import {MongoClient} from "mongodb"

const app = express()
const port = 3000
app.use (cors())

app.use(express.json()); 
// app.use(cors({ origin: "http://localhost:5173" }));

const url = "mongodb://localhost:27017/"

const client = new MongoClient(url)
const dbname = "passwordManager"
 
let collection

async function main() {
  await client.connect();
  console.log("connected successfully to server")
  const db = client.db(dbname)
   collection = db.collection("passwords")
   return 'DONE'
  
}
main()



app.get('/',async   (req, res) => {

  const data = await collection.find({}).toArray()
  res.json(data)
})


app.post('/', async(req, res) => {
const data = req.body;

try{  await collection.insertOne(data)
  console.log(data)

  res.send('data is saved in mongodb')
} catch (error) {
  console.error(error)
  res.status(500).send('Error saving data to mongodb')
}
})

app.delete('/', async(req, res) => {
const data = req.body;
 await collection.deleteOne(data)
console.log(data)


  res.send('data is deleted in mongodb')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

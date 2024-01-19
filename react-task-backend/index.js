const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

// middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    "https://mediusware-000.netlify.app"
  ],
  credentials: true
}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxzfy8n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("mediuswareDB");
    const userCollection = database.collection("userCollection")


    // getting user collection 
    app.get('/user-collection', async (req, res) => {
      const result = await userCollection.find().toArray();
      // console.log(result);
      res.send(result)
    })

    // posting user details 
    app.post('/user-collection', async (req, res) => {
      const userData = req.body;
      console.log(userData);
      const result = await userCollection.insertOne(userData)
      res.send(result)
    })

   
    // user data get by status 
    app.get('/user-collection/:status', async (req, res) => {
      const userStatus = req.params.status;
      console.log(userStatus);
    
      let result;
    
      if (userStatus === 'all') {
        // When status is 'all', fetch data with a specific sort order
        result = await userCollection.aggregate([
          {
            $addFields: {
              customSort: {
                $cond: {
                  if: { $eq: ['$status', 'active'] },
                  then: 1,
                  else: {
                    $cond: {
                      if: { $eq: ['$status', 'completed'] },
                      then: 2,
                      else: 3 // or any other value for other statuses
                    }
                  }
                }
              }
            }
          },
          { $sort: { customSort: 1 } }
        ]).toArray();
      } else {
        // When status is specific (e.g., 'active' or 'completed'), fetch data without sorting
        result = await userCollection.find({ status: userStatus }).toArray();
      }
    
      console.log(result);
      res.send(result);
    });
    


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send("Running onnn....")
})

app.listen(port, () => {
  console.log(`mediusware server is running on port ${port}`);
})
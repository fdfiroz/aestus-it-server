const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://tasker-task-management-tools.web.app", "https://tasker-task-management-tools.firebaseapp.com"],
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));


  const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@aestus-it.2ictbm2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//Start server
app.get("/", (req, res) => {
  res.send("Hello from Aestus Server.");
});

app.listen(port, () => {
  console.log(`Aestus server is running on port ${port}`);
});

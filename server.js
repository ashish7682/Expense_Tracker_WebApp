const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectdb");

//config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cors());

//routes
//-------user routes-----------
app.use("/api/v1/users", require("./routes/userRoute"));

//----------transection routes--------
app.use("/api/v1/transection", require("./routes/transectionRoutes"));

//port

const PORT = 8080 || process.env.PORT;

//listen server

app.listen(PORT, () => {
  console.log(`server running on ${8080}`);
});

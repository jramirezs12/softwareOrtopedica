const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Employee = require("./routes/employee");
const User = require("./routes/user");
const Catalogue = require("./routes/catalogue");
require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(express.json());
app.use(cors());
app.use(User);
app.use(Catalogue);

app.use("/api/employee", Employee);
app.use("/api/user", User);
app.use("/api/catalogue", Catalogue);
app.use("/uploads", express.static("uploads"));

app.get('/', (req,res)=>{
  res.send('hola mundo')
} )

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();

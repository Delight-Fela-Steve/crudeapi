require('dotenv').config()
const express = require('express');
const cors = require("cors");
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express();
const userroutes = require('./src/routes/user');
const albumroutes= require('./src/routes/album');
const artistroutes = require('./src/routes/artist');
const songroutes= require('./src/routes/song')

app.use(express.json({extended: false}));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin:true}));

connectDB();

app.get("/", (req, res) => {
    res.status(200).send({
      status: "success",
      data: {
        message: "Music Api SideHustle Portfolio Bootcamp",
      },
    });
  });

  
  
  app.use("/api/v1/user", userroutes);
  app.use("/api/v1/album", albumroutes);
  app.use("/api/v1/artist", artistroutes);
  app.use("/api/v1/song", songroutes);
  


  app.all("*", (req, res) => {
    res.send({
      status: false,
      messsage: "Oops! you've hitted an invalid route.",
    });
  });
  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
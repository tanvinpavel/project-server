const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./Middleware/credentials");
const corsOptions = require("./Config/corsOptions");
const mongoose = require("mongoose");
require("dotenv").config();

//route method
const app = express();

//middleware
app.use([express.json(), credentials, cors(corsOptions), cookieParser(process.env.COOKIE_SECRET)]);

//connect to mongoose database
mongoose
  .connect(process.env.MONGO_SECRET)
  .then(() => {
    //port variable
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log("Server is running in port " + port);
      app.get("/", (req, res) => {
        res.send("hi this is Project Server");
      });

      const postsRoute = require("./Routes/postsRoute");
      const usersRoute = require("./Routes/usersRoute");
      const authRoute = require("./Routes/authRoute");

      app.use("/post", postsRoute);
      app.use("/user", usersRoute);
      app.use("/auth", authRoute);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

// const workoutRouter = require("./routes/workouts");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const express = require("express");
// const app = express();
// app.use(express.json());

// app.use("/api/workouts", workoutRouter);

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     app.use((req, res, next) => {
//       console.log(`${req.method} ${req.path}`);
//       next();
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// //server
// app.listen(process.env.PORT, () => {
//   console.log("This listening the PORT", process.env.PORT);
// });

const workoutRouter = require("./routes/workouts");
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// Add your routes and middleware BEFORE starting the server
app.use("/api/workouts", workoutRouter);

// Connect to DB and then start server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });

    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

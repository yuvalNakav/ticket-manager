const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;
const api = require("./routes/index");

app.use("/api", api);

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log(`connected to MongoDB - ${env}`);
//     app.listen(PORT, () =>
//       console.log(`app listening at http://localhost:${PORT}`)
//     );
//   })
//   .catch((error) => {
//     console.log("error connecting to MongoDB:", error.message);
//   });

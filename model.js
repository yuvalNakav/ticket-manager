const mongoose = require("mongoose");
require("dotenv").config();
const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
// const PORT = process.env.PORT || 8080;
// const app = require("./app");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const TicketSchema = new mongoose.Schema({
  title: String,
  content: String,
  userEmail: String,
  done: { type: Boolean, default: false },
  creationTime: { type: Date, default: Date.now },
  labels: [String],
});
const TicketModel = new mongoose.model(`Ticket`, TicketSchema);
module.exports = TicketModel;

const mongoose = require("mongoose");
const mongooseUri = "mongodb://localhost/UserRegistration";

const connetToMongo = async () => {
  mongoose.connect(mongooseUri, () => {
    console.log(`connet to db successfully`);
  });
};
module.exports = connetToMongo;

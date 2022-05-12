const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco conectado");
  } catch (e) {
    console.log("Error: ", e.message);
  }
};
module.exports = {
  connect,
};

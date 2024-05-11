const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conns = await mongoose.connect(
      "mongodb+srv://devMosh:devMosh@cluster0.uu47p7v.mongodb.net/cluster0?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        autoIndex: true,
        useNewUrlParser: true,
      }
    );
    console.log(`Mongo DB connected: ${conns.connection.host}`);
    console.log(`Mongo DB name: ${conns.connection.name}`);
    // console.log(`Mongo DB host: ${conns.connection.host}`.purple);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;

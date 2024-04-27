const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conns = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log(`Mongo DB connected: ${conns.connection.host}`);
    console.log(`Mongo DB name: ${conns.connection.name}`);
    // console.log(`Mongo DB host: ${conns.connection.host}`.purple);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;

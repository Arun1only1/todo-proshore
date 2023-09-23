import mongoose from "mongoose";

// db connection
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connected");
  } catch (error) {
    console.log("DB connection failed", error.message);
  }
};

export default dbConnect;

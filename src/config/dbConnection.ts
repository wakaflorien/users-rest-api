import mongoose from "mongoose";

interface Options {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export const connectDB = async () => {
  try {
    const options: Options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.DATABASE_URI!, options);
    console.log("⚡️⚡️⚡️ Database connected successfully");
  } catch (error) {
    console.error(error);
  }
};

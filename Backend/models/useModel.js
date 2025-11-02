import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

});

export default mongoose.model("User", userSchema);

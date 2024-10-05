import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export default mongoose.model<IUser>("User", UserSchema);

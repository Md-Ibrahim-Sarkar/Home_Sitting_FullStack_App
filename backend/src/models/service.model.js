import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: "Users",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  user: UserSchema,
});


const Service = mongoose.model("Service", ServiceSchema);


export default Service; 

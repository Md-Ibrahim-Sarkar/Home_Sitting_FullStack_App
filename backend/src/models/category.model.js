import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true
    },
    sub: {
      type: [String],
      default: []
    }

  },
  {
    timestamps: true,
  }
);


const Category = mongoose.model("Category", categorySchema);

export default Category;

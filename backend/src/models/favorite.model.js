import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

const FavoriteServices = mongoose.model("FavoriteServices", favoriteSchema)

export default FavoriteServices
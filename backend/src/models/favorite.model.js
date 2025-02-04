import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    serviceId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    love: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const FavoriteServices = mongoose.model("FavoriteServices", favoriteSchema)

export default FavoriteServices
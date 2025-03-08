import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Cash on delivery", "online"], required: true },
    status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "canceled"], default: "pending" },
    orderDate: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;

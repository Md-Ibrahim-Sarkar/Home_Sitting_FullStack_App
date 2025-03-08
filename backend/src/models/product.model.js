import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: true },
    quantity: { type: Number, default: 0 },
    isStock: { type: Boolean, default: true },
    brand: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    tags: { type: [String], default: [] },
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    shippingDetails: {
      estimatedTime: { type: String, default: "3-7 days" },
      cost: { type: Number, default: 0 }
    },
    sold: { type: Number, default: 0 },
    variants: [{
      size: { type: String },
      color: { type: String },
      additionalPrice: { type: Number, default: 0 },
      quantity: { type: Number, default: 0 },
      discount: { type: Number, default: 0 }
    }],
    specifications: [{
      feature: { type: String, required: true },
      value: { type: String, required: true }
    }],
    additionalInfo: { type: [String], default: [] },
    supplier: { type: String },
    warranty: { type: String },
    returnPolicy: { type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add indexes for better query performance
ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ sku: 1 }, { unique: true });

const Product = mongoose.model("Products", ProductSchema);

export default Product; 

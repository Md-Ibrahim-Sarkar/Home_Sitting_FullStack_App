import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt timestamps
);

// Add indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;

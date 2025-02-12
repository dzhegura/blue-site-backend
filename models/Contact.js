import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;

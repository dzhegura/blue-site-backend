import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;

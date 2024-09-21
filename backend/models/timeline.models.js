import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  timeline: {
    from: {
      type: String,
      required: [true, "From value of timeline is required"],
    },
    to: String,
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);

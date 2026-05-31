import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Company is Required"],
  },
  jobTitle: {
    type: String,
    
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
},{timestamps:true});

export const Timeline = mongoose.model("Timeline", timelineSchema);

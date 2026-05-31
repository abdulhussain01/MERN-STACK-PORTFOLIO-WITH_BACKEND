import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    minlength: [3, "Name must contain atleast 3 characters!"],
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    minlength: [3, "Subject must contain atleast 3 characters!"],
  },
  message: {
    type: String,
    minlength: [5, " Message must contain atleast 5 characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messageSchema);

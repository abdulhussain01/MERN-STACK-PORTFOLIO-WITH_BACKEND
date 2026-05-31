import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

import ErrorHandler from "../middleware/error.js";

import { Message } from "../models/message.models.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName,email, subject, message } = req.body;

  if (!senderName ||!email || !subject || !message) {
    return next(new ErrorHandler("Please fill full Form", 400));
  }
  const data = await Message.create({
    senderName,
    subject,
    email,
    message,
  });

  res.status(200).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message already deleted", 400));
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted",
  });
});

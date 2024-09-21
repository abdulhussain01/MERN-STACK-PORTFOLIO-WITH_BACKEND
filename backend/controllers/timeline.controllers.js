import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Timeline } from "../models/timeline.models.js";
import ErrorHandler from "../middleware/error.js";
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, type, description, from, to } = req.body;

  const newtimeline = await Timeline.create({
    title,
    description,
    type,
    timeline: {
      from,
      to,
    },
  });

  res.status(201).json({
    success: true,
    message: "Timeline Added",
    newtimeline,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not Found"), 404);
  }

  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline deleted succesfully",
  });
});
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timeline = await Timeline.find();

  res.status(200).json({
    success: true,
    timeline,
  });
});

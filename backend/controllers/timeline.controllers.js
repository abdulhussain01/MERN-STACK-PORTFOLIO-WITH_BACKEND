import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Timeline } from "../models/timeline.models.js";
import ErrorHandler from "../middleware/error.js";

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { company, jobTitle, type, description, from, to } = req.body;

  const newtimeline = await Timeline.create({
    company,
    jobTitle,
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

export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const { company, jobTitle, type, description, from, to } = req.body;

  const project = await Timeline.findByIdAndUpdate(
    req.params.id,
    {
      company,
      jobTitle,
      type,
      description,
      timeline: {
        from,
        to,
      },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );

  res.status(200).json({
    success: true,
    message: "Timeline updated",
    project,
  });
});

export const getSingleTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const timeline = await Timeline.findById(id);

  if (!timeline) {
    return next(new ErrorHandler("Timeline Not Found", 404));
  }

  res.status(200).json({
    success: true,
    timeline,
  });
});

import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { SoftwareApplication } from "../models/softwareApplications.models.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplications = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/Svg  Is Required", 400)
    );
  }

  const { svg } = req.files;
  const { name } = req.body;

  // software icon uploading
  const cloudinaryResponseForSvg = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "Software Applications" }
  );

  if (!cloudinaryResponseForSvg || cloudinaryResponseForSvg.error) {
    console.error(
      "cloudinary Error",
      cloudinaryResponseForSvg.error || "Unknown Cloudinary Error"
    );
  }

  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponseForSvg.public_id,
      url: cloudinaryResponseForSvg.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Software Application Added!",
    softwareApplication,
  });
});

export const deleteApplications = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const softwareApplication = await SoftwareApplication.findById(id);

  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application Not Found"), 404);
  }

  const softwareApplicationSvgId = softwareApplication.svg.public_id;

  await cloudinary.uploader.destroy(softwareApplicationSvgId);

  await softwareApplication.deleteOne();

  res.status(200).json({
    success: true,
    message: "Software Application Deleted",
  });
});

export const getAllSoftwareApplications = catchAsyncErrors(
  async (req, res, next) => {
    const softwareApplication = await SoftwareApplication.find();

    res.status(200).json({
      success: true,
      softwareApplication,
    });
  }
);

import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../middleware/error.js";
import { Project } from "../models/project.models.js";

export const addProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Is Required", 400));
  }

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;
  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }

  const cloudinaryResponseForProjectBanner = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    {
      folder: "Project Images",
    }
  );

  if (
    !cloudinaryResponseForProjectBanner ||
    cloudinaryResponseForProjectBanner.error
  ) {
    console.error(
      "cloudinary Error",
      cloudinaryResponseForProjectBanner.error || "Unknown Cloudinary Error"
    );
    return next(
      new ErrorHandler("Failed to upload project Banner to cloudinary", 500)
    );
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponseForProjectBanner.public_id,
      url: cloudinaryResponseForProjectBanner.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Project Added",
    project,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  console.log(newProjectData);

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;

    console.log(projectBanner)

    const project = await Project.findById(req.params.id);

    const projectImageId = project.projectBanner.public_id;

    await cloudinary.uploader.destroy(projectImageId);

    const newProjectImage = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "Project Images" }
    );

    newProjectData.projectBanner = {
      public_id: newProjectImage.public_id,
      url: newProjectImage.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Profile updated",
    project,
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  await cloudinary.uploader.destroy(project.projectBanner.public_id);

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project Deleted",
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.find();

  res.status(200).json({
    success: true,
    project,
  });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

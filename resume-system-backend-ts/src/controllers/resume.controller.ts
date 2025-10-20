import { Request, Response } from "express";
import Resume from "../model/resume.model";

//create resume
export const createResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { aboutMe, education, skills, projects, experience } = req.body;

    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    const id = req.user?._id as string;

    const newResume = await Resume.create({
      user: id,
      aboutMe,
      education,
      skills,
      projects,
      experience,
    });

    if (!newResume) {
      res.status(404).json({ success: false, message: "resume not created" });
      return;
    }

    res.status(201).json({
      success: true,
      message: "resume created successfully",
      data: newResume,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while creating the resume`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//update resume
export const updateResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { aboutMe, education, skills, projects, experience } = req.body;

    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    const id = req.user?._id as string;

    const updatedResume = await Resume.findOneAndUpdate(
      { user: id },
      {
        aboutMe,
        education,
        skills,
        projects,
        experience,
      },
      { new: true }
    );

    if (!updatedResume) {
      res.status(404).json({ success: false, message: "resume not update" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "resume update successfully",
      data: updatedResume,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while updating the resume`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//delete resume
export const deleteResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    const id = req.user?._id as string;

    const deletedResume = await Resume.findOneAndDelete({ user: id });

    if (!deletedResume) {
      res.status(404).json({ success: false, message: "resume not deleted" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "resume deleted successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while deleting the resume`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

//fetched resume
export const fetchResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: resumeId } = req.params;

    if (!resumeId) {
      res.status(404).json({ success: false, message: "resumeID not found" });
      return;
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      res.status(404).json({ success: false, message: "resume not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "resume fetched successfully",
      data: resume,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while fetching the resume`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

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
        
    } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while updating the resume`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
}
//delete resume 
export const deleteResume = async (
  req: Request,
  res: Response
): Promise<void> => {
    try {
        
    } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while deleting the resume`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
}
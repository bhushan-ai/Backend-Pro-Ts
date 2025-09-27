import { Request, Response } from "express";
import Note from "../models/notes.model";

//adding note
export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, tags } = req.body;
    if (!req.user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (!title || !content || !tags) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const note = await Note.create({
      title,
      content,
      tags,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note created",
      data: note,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while creating note `, err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in server",
      err: err,
    });
  }
};

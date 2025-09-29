import { Request, Response } from "express";
import Note from "../models/notes.model";
import User from "../models/user.model";

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

    if (!note) {
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating note",
      });
    }
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

//get one note
export const getNote = async (req: Request, res: Response): Promise<void> => {
  const { id: noteId } = req.params;
  try {
    if (!noteId) {
      res.status(400).json({ success: false, message: "Id not found" });
      return;
    }

    const note = await User.findById(noteId);
    if (!note) {
      res.status(404).json({ success: false, message: "Note not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while fetching note `, err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in server",
      err: err,
    });
  }
};

//get All note
export const getAllNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    const id: string = req.user?._id;

    const allNotes = await Note.find({ createdBy: id }).select(
      "title content tags"
    );

    if (allNotes === null) {
      res.status(404).json({ success: false, message: "There is no note" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "all notes", data: allNotes });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while fetching note `, err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in server",
      err: err,
    });
  }
};

//search  the note
export const searchNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    const id: string = req.user?._id;
    const q = req.query.q as string;

    const searchedNotes = await Note.find({
      createdBy: id,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ],
    }).select("title content tags");

    if (!searchedNotes) {
      res.status(404).json({
        success: false,
        message: `${searchedNotes} not found`,
        data: searchedNotes,
      });
      return;
    }
    res.status(200).json({ success: true, message: "notes fetched" });
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

//update Note //todo
export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

//delete the note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id: noteId } = req.params;

    if (!noteId) {
      res.status(400).json({ success: false, message: "Id not found" });
      return;
    }
    const deletedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        isDeleted: true,
      },
      { new: true }
    );
    if (!deletedNote) {
      res.status(400).json({ success: false, message: "Note not deleted" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Note deleted",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while deleting note `, err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in server",
      err: err,
    });
  }
};

//restore the note
export const restoreNote = async (req: Request, res: Response) => {
  try {
    const { id: noteId } = req.params;

    if (!noteId) {
      res.status(400).json({ success: false, message: "Id not found" });
      return;
    }
    const restoreNote = await Note.findByIdAndUpdate(
      noteId,
      {
        isDeleted: false,
      },
      { new: true }
    );
    if (!restoreNote) {
      res.status(400).json({ success: false, message: "Note not restore" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Note restored",
      data: restoreNote,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while restoring note `, err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in server",
      err: err,
    });
  }
};

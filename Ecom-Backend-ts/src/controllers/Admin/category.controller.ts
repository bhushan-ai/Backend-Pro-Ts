import { Request, Response } from "express";
import Category from "../../models/category.model";

export const addCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, slug, description } = req.body;
  try {
    if (!name || !slug || !description) {
      res.status(400).json({ success: false, message: "all fields required" });
      return;
    }
    const category = new Category({
      name,
      slug,
      description,
    });
    await category.save();

    res
      .status(201)
      .json({ success: true, message: "category added", data: category });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while creating category`, err);
    res
      .status(500)
      .json({ success: false, message: "Server side error", error: err });
  }
};

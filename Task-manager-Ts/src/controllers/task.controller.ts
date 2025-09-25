import { Request, Response } from "express";
import Task from "../models/task.model";

//create Task
export const addTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dueDate } = req.body;

  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    console.log("user id", req.user._id);

    if (!title || !description || !dueDate) {
      res.status(400).json({
        success: false,
        message: "All fields required",
      });
      return;
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      createdBy: req.user._id,
    });

    if (!task) {
      res.status(401).json({
        success: false,
        message: "Task is not created",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Task creation failed Server error",
      error: err,
    });
  }
};

//get task
export const getTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Id required",
      });
    }
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Task creation failed Server error",
      error: err,
    });
  }
};

//update task
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: taskId } = req.params;
  const { title, description, dueDate } = req.body;

  try {
    if (!title || !description || !dueDate) {
      res.status(400).json({
        success: false,
        message: "All fields required",
      });
      return;
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: title,
        description: description,
        dueDate: dueDate,
      },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({
        success: true,
        message: "Task not updated successfully",
      });
      return;
    }
    console.log("upTask", updatedTask);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Something went wrong while updating the task", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

//delete task
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;

  try {
    if (!taskId) {
      res.status(404).json({
        success: false,
        message: "There is no Task",
      });
    }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      res.status(404).json({
        success: false,
        message: "task not deleted",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while deleting the task`, err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

//get all task
export const allTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await Task.find({});

    if (allTasks.length <= 0) {
      res.status(404).json({
        success: false,
        message: "There is no Tasks",
      });
    }
    res.status(200).json({
      success: true,
      message: "All tasks",
      data: allTasks,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while fetching the tasks`, err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
//delete all task
export const deleteAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await Task.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All tasks deleted",
      data: allTasks,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`something went wrong while deleting all the tasks`, err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

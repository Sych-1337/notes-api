import { Response } from "express";
import { Note } from "../models/Note";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      title,
      content,
      owner: req.user!.userId
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

export const getMyNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ owner: req.user!.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notes" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.owner.toString() !== req.user!.userId) {
      return res.status(403).json({ message: "You are not the owner of this note" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.owner.toString() !== req.user!.userId) {
      return res.status(403).json({ message: "You are not the owner of this note" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};

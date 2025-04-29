import express from "express";
import {
  createNote,
  getMyNotes,
  updateNote,
  deleteNote
} from "../controllers/noteController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticateToken, createNote);
router.get("/", authenticateToken, getMyNotes);
router.put("/:id", authenticateToken, updateNote);
router.delete("/:id", authenticateToken, deleteNote);

export default router;

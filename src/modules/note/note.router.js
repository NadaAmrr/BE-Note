import * as noteController from './controller/note.js'
import { Router } from "express";
const router = Router()


// 1- add note
router.post("/add", noteController.add);

// 2- delete note (note creator only )
router.delete("/:id/:UserId", noteController.deleteNote);

// 3- update note (note owner only)
router.put("/:id/:UserId", noteController.update);

// 4- get all notes
router.get("/", noteController.getAllNotes);

// 5- get all notes with their owners informaion (using join)
router.get("/noteList", noteController.noteList);

export default router
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

//  Route 1: Get all the Notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.user });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// _____________________________________________

//  Route 2: Get all the Notes
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter the title atleast 5 character").isLength({ min: 5 }),
    body("description", "Enter description at least 5 character").isLength({
      min: 5,
    }),
    body("tag").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if there is error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //   destructuring the req.body
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.user,
      });

      // saving the notes to database
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// _____________________________________________________________
//  Route3: update the note
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    
    if (note.user.toString() !== req.user.user) {
      return res.status(401).send("Not Allowed");
    }
    
    const resNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
      );
      res.json({ resNote });
    } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// _____________________________________________________________
//  Route3: delete the note
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.user) {
      return res.status(401).send("Not Allowed");
    }

    const resNote = await Note.findByIdAndDelete(req.params.id);
    res.json({Success:"Note has been delted", resNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

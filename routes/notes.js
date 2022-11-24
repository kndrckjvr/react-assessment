const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const Note = require("../models/notes");

const getNote = async (request, response, next) => {
  let note;
  try {
    note = await Note.findOne({
      deleted_at: null,
      uid: request.params.id,
    });
    if (note == null) {
      return response.status(404).json({ message: "cannot find note" });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

  response.note = note;
  next();
};

// get notes
router.get("/", async (request, response) => {
  try {
    let find = {
      deleted_at: null,
    };

    if (request.query.search) {
      find.title = {
        $regex: `.*${request.query.search}.*`,
        $options: "i",
      };
    }

    const notes = await Note.find(find).sort({ created_at: -1 });

    response.json(notes);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// show notes
router.get("/:id", getNote, (request, response) => {
  response.send(response.note);
});

// store notes
router.post("/", async (request, response) => {
  let data = { ...request.body };

  const note = new Note({
    uid: uuidv4(),
    title: data.title,
    body: data.body,
  });

  try {
    const newNote = await note.save();
    response.status(201).json(newNote);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// patch notes
router.patch("/:id", getNote, async (request, response) => {
  let note = response.note;
  let body = { ...request.body };

  note.updated_at = new Date();
  if (body.title != null) {
    note.title = body.title;
  }
  
  if (body.body != null) {
    note.body = body.body;
  }

  try {
    const updatedNote = await note.save();
    response.json(updatedNote);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// delete
router.delete("/:id", getNote, async (request, response) => {
  if (response.note.deleted_at != null) {
    response.status(400).json({ message: "you have already deleted this." });
  }

  response.note.deleted_at = new Date();

  try {
    const updatedNote = await response.note.save();
    response.json(updatedNote);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;

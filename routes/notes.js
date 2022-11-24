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
        $options: 'i'
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
router.patch("/", (request, response) => {});

// delete
router.delete("/:id", (request, response) => {});

module.exports = router;

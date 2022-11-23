const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const Note = require("../models/notes");

const getNote = async (request, response, next) => {
  let note;
  try {
    note = await Note.findOne({"uid": request.params.id});
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
    const notes = await Note.find();

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
  console.log(data);

  const note = new Note({
    uid: uuidv4(),
    title: data.title,
    body: data.body,
  });
  console.log("wat");

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

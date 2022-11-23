const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Notes", noteSchema);

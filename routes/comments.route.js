const { Comments } = require("../models/ticket.model");

const comments = require("express").Router();

// add comment
comments.post("/add", async (req, res) => {
  try {
    const { message, userId, ticketId } = req.body;
    if (!message || !ticketId) {
      res.status(404).json({ message: "Missing information." });
    } else {
      await Comments.create({ message, senderId: userId, ticketId });

      res.status(201).json({ message: "Comment added successfully." });
    }
  } catch (error) {
    res.status(501).json({ message: "Failed to add this comment." });
  }
});

module.exports = comments;

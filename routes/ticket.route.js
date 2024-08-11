const { Op } = require("sequelize");
const { Tickets, Comments } = require("../models/ticket.model");
const { Users } = require("../models/users.model");

const ticket = require("express").Router();

// get tickets
ticket.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const tickets = await Tickets.findAll({
      where: {
        [Op.or]: [{ userId: userId }, { assignTo: userId }],
      },
      include: [
        { model: Users, attributes: { exclude: ["password", "email"] } },
      ],
    });

    res.status(200).json({ tickets });
  } catch (error) {
    res.send(501).json({ message: "Failed to get the tickets" });
  }
});

// single ticket details
ticket.get("/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await Tickets.findOne({
      where: {
        id: ticketId,
      },
      include: Comments,
    });
    res.status(200).json({ ticket: ticket });
  } catch (error) {
    res.status(501).json({ message: "Failed to get the ticket details" });
  }
});

// ticket create
ticket.post("/add-ticket", async (req, res) => {
  try {
    await Tickets.create(req.body);

    res.status(201).json({ message: "Ticket created successfully." });
  } catch (error) {
    res
      .status(501)
      .json({ message: "Failed to create the ticket. Please try again!" });
  }
});

// update ticket
ticket.put("/update-ticket/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const activeUserId = req.body.userId;
    delete req.body.userId;
    await Tickets.update(req.body, {
      where: {
        [Op.and]: [
          { id: ticketId },
          { [Op.or]: [{ userId: activeUserId }, { assignTo: activeUserId }] },
        ],
      },
    });

    res.status(200).json({ message: "Ticket is updated successfully." });
  } catch (error) {
    res
      .status(501)
      .json({ message: "Failed to update the ticket. Please try again." });
  }
});

// delete ticket
ticket.delete("/delete-ticket/:ticketId", async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    console.log(ticketId);
    await Tickets.destroy({
      where: {
        id: ticketId,
      },
    });
    res.status(200).json({ message: "Ticket deleted successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .json({ message: "Failed to delete this ticket.Please try again." });
  }
});

module.exports = ticket;

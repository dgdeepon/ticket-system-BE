const { Organizations, Users } = require("../models/users.model");

const organization = require("express").Router();

// get organization details
organization.get("/", async (req, res) => {
  try {
    const organizationList = await Organizations.findAll({
      include: [
        { model: Users, attributes: { exclude: ["password", "email"] } },
      ],
    });

    res.status(200).json({ organization: organizationList });
  } catch (error) {
    res.status(501).json({ message: "Failed to get organization details." });
  }
});

module.exports = organization;

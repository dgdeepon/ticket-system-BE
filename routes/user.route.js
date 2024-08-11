const { Users, Organizations } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userRegisterMiddleware = require("../middlewares/userRegister.middleware");
const { ADMIN } = require("../utils/variables");
require("dotenv").config();
const user = require("express").Router();

// creating user profile
user.post("/register", userRegisterMiddleware, async (req, res) => {
  try {
    const { name, email, password, role, organization } = req.body;
    bcrypt.hash(
      password,
      Number(process.env.USERS_SALT_ROUND),
      async (err, hash) => {
        if (err) {
          res
            .status(401)
            .json({ message: "Unexpected error. please try again." });
        } else if (hash) {
          try {
            const user = await Users.create(
              {
                name,
                password: hash,
                email,
                role,
                ...(organization && role.toLowerCase() == ADMIN
                  ? {
                      organization: {
                        ...organization,
                        name: organization?.name || name,
                      },
                    }
                  : {}),
              },
              { include: role.toLowerCase() == ADMIN ? [Organizations] : [] }
            );

            res.status(201).json({
              user: user,
              message: "user created successfully.",
            });
          } catch (error) {
            res
              .status(401)
              .json({ message: "Email is connected to another account." });
          }
        } else {
          res.status(401).json({
            message: "Failed register your account. Please try again!",
          });
        }
      }
    );
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed register your account. Please try again!" });
  }
});

// user login
user.post("/login", userRegisterMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email: email },
      include: Organizations,
    });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          res.status(401).json({ message: "please check your password." });
        } else if (!result) {
          res.status(401).json({ message: "please check your password." });
        } else {
          const token = jsonwebtoken.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
            },
            process.env.USERS_JSON_SIGN_KEY
          );
          res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email,
              ...(user?.organization?.name
                ? {
                    organization: {
                      name: user.organization.name,
                    },
                  }
                : {}),
            },
          });
        }
      });
    } else {
      res.status(404).json({ message: "User doesn't exists." });
    }
  } catch (error) {
    res.status(401).json({ message: "Failed to login. Please try again!" });
  }
});

module.exports = user;

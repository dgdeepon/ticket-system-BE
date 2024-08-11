const express = require("express");
const databaseInstance = require("./config/db.config");
const user = require("./routes/user.route");
const authentication = require("./middlewares/authentication.middleware");
const ticket = require("./routes/ticket.route");
const comments = require("./routes/comments.route");
const cors = require('cors');
const organization = require("./routes/organization");

// app
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/users", user);
app.use('/tickets', authentication, ticket);
app.use('/comments', authentication, comments);
app.use('/organization', authentication, organization);

// listening app
app.listen(8080, async () => {
  try {
    await databaseInstance.sync({ force: true });
    console.log(`Server is running on port ${8080}`);
  } catch (error) {
    console.log(error);
    console.log("Failed to connected with server and db.");
  }
});

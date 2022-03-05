const express = require("express");
var cors = require('cors');
const connetToMongo = require("./db");

connetToMongo();

const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./router/auth"));
app.use("/api/notes", require("./router/notes"));

app.listen(port, () => {
  console.log(`App listen at http://localhost:${port}`);
});

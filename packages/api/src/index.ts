import express from "express";
import { PORT } from "~/constants";

console.log(`PORT: ${PORT}`);

const app = express();
const port = PORT; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("@foo/api transpiled!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

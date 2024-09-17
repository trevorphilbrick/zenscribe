import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express with ES Modules!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

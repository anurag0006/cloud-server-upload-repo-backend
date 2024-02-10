import express from "express";
import cors from "cors";
import deployRouter from "./routes/deploy";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// app.get("/api/deploy", (req, res) => {
//   res.send("req received");
// });

app.use("/api/deploy", deployRouter);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

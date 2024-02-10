import { generate } from "../utils";
import simpleGit from "simple-git";
import path from "path";
import { getAllFiles } from "../getAllFiles";

console.log(__dirname);

const router = require("express").Router();

router.get("/", (req: any, res: any) => {
  res.send("req success");
});

router.post("/", async (req: any, res: any) => {
  const repoUrl = req.body.repoUrl;
  console.log(repoUrl);
  const id = generate();
  console.log(id);
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
  const files = getAllFiles(path.join(__dirname, `output/${id}`));
  console.log(files);

  res.json({ id: id }).status(200);
});

module.exports = router;

export default router;

import { generate } from "../utils";
import simpleGit from "simple-git";
import path from "path";
import { getAllFiles } from "../getAllFiles";
import { GetDirName } from "../getDirname";
import { uploadFile } from "../aws";
import { createClient } from "redis";

const publisher = createClient();
publisher.connect();

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
  const dirname = GetDirName();
  console.log(dirname);
  console.log(path.join(dirname, `output/${id}`));
  try {
    await simpleGit().clone(repoUrl, path.join(dirname, `output/${id}`));
    const files = getAllFiles(path.join(dirname, `output/${id}`));
    console.log(files);

    files.forEach(async (file) => {
      await uploadFile(file.slice(dirname.length + 1), file);
    });

    publisher.lPush("build-queue", id);
    console.log("done");

    res.json({ id: id }).status(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

export default router;

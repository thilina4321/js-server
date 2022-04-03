const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("./model/post");

app.use(express.json());

// 1.1.2 when receive the get request .....
app.get("/api/v1/get-request", (_, res) => {
  return res.status(200).send({ data: "200 ok" });
});

app.post("/api/v1/post-request", async (req, res) => {
  // 2.1.1 ......................
  const { id, method } = req.body;

  // 2.1.2 ......................
  if (!id || !method) {
    return res.status(400).send({ status: 4000, desc: "error" });
  }

  try {
    // 2.1.4 .........................
    const findData = await Post.findById(id);
    if (!findData) {
      return res.status(404).send({ status: 4001, desc: "id_not_found" });
    }
    // 1.1.3 when receive the post request .....
    // 2.1.3 ...................................
    return res.status(200).send({ status: 2000, desc: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "server error" });
  }
});

app.post("/api/v1/add-data", async (req, res) => {
  const { method } = req.body;

  try {
    await Post.create({ method });
    return res.status(201).send({ desc: "success" });
  } catch (error) {
    return res.status(500).send({ error: "server error" });
  }
});

app.get("/api/v1/get-data", async (_, res) => {
  try {
    const data = await Post.find();
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: "server error" });
  }
});

// 1.1.1 when running the it should .....
const port = process.env.PORT;
const dbs = `mongodb+srv://dilshan:thilina1234@cluster0.gjqff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(dbs)
  .then(() => {
    app.listen(port, () => {
      console.log("App starts on port ", port);
    });
  })
  .catch((e) => {
    console.log("faild to connect to the db", e);
  });

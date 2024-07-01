import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import user from "./user.js";
import post from "./post.js";
import like from "./like.js";
import save from "./save.js";
import comment from "./comment.js";

const app = express();
const PORT = process.env.URL_PORT || 3002;

app.use(cors());
app.use(express.json());

// /////////////////////////////// USERS ///////////////////////////////////

app.get("/all_users", async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/all_users/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const selectedUser = await user.findByPk(param);
    if (selectedUser) {
      res.json(selectedUser);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

// /////////////////////////////// POSTS ///////////////////////////////////

app.get("/all_posts", async (req, res) => {
  try {
    const posts = await post.findAll({
      include: [
        {
          model: like,
        },
        {
          model: save,
        },
        {
          model: comment,
        },
        {
          model: user,
        },
      ],
    });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/all_posts/:id", async (req, res) => {
  try {
    const paramId = req.params.id;
    const selectedLike = await post.findByPk(paramId, {
      include: [
        {
          model: like,
        },
        {
          model: save,
        },
        {
          model: comment,
        },
        {
          model: user,
        },
      ],
    });
    res.json(selectedLike);
  } catch (err) {
    console.log(err.message);
  }
});

// /////////////////////////////// LIKES ///////////////////////////////////

app.get("/all_likes", async (req, res) => {
  try {
    const likes = await like.findAll();
    res.json(likes);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/all_likes/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const selectedLike = await like.findAll({
      where: { post_id: param },
    });
    res.json(selectedLike);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/all_likes", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const post_id = req.body.post_id;

    const findLike = await like.findOne({
      where: { user_id: user_id, post_id: post_id },
    });

    if (findLike) {
      await like.destroy({ where: { post_id: post_id, user_id: user_id } });
      res.status(200).json({ message: "Like removed" });
    } else {
      const createLike = await like.create({
        user_id,
        post_id,
      });
      res.status(201).json(createLike);
    }
  } catch (err) {
    console.log("error like:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// /////////////////////////////// COMMENTS ///////////////////////////////////

app.get("/all_comments", async (req, res) => {
  try {
    const comments = await comment.findAll();
    res.json(comments);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/all_comments", async (req, res) => {
  try {
    const comments = req.body.comment;
    const post_id = req.body.post_id;
    const created_by_user_id = req.body.created_by_user_id;

    const createComment = await comment.create({
      post_id,
      created_by_user_id,
      comment: comments,
    });
    res.status(201).json(createComment);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT);

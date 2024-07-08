import express from "express";
import cors from "cors";

import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

import user from "./user.js";
import follow from "./follow.js";
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
    console.log("error from all_users", err.message);
  }
});

app.get("/all_users/userId/:id", async (req, res) => {
  try {
    const params = req.params.id;
    const users = await user.findAll({ where: { id: params } });
    res.json(users);
  } catch (err) {
    console.log("errrrrrrrrrr", err.message);
  }
});

app.get("/all_users/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const params = param.replace("_", " ");
    const selectedUser = await user.findAll({
      where: { user_name: params },
      include: [
        {
          model: post,
        },
        {
          model: like,
        },
        {
          model: save,
        },
      ],
    });
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
      order: [["created_datetime", "DESC"]],
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

// /////////////////////////////// UPLOAD FILES ///////////////////////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/film");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/all_posts", upload.single("film"), async (req, res) => {
  const { caption, created_by_user_id } = req.body;

  const media_file_main_name = req.file.filename;
  if (media_file_main_name) {
    const media_file = `/film/${media_file_main_name}`;
    try {
      const createLike = await post.create({
        caption,
        media_file,
        created_by_user_id,
      });
      res.status(201).json(createLike);
    } catch (err) {
      console.log("upload error:", err.message);
    }
  } else {
    process.exit();
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

app.get("/all_likes/likedUser/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const selectedLike = await like.findAll({
      where: { user_id: param },
      include: [{ model: post }, { model: user }],
    });
    res.json(selectedLike);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/all_likes/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await post.findAll({
      where: { created_by_user_id: userId },
      include: [{ model: like }],
    });

    const likesByUser = posts.reduce((acc, post) => {
      acc[post.id] = (acc[post.id] || 0) + post.likes.length;
      return acc;
    }, {});

    const response = {
      userId,
      totalLikes: Object.values(likesByUser).reduce(
        (sum, value) => sum + value,
        0
      ),
      postLikes: Object.keys(likesByUser).map((postId) => parseInt(postId)),
    };

    res.json(response);
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

// /////////////////////////////// FAVORITES ///////////////////////////////////

app.get("/all_favorites", async (req, res) => {
  try {
    const favorites = await save.findAll();
    res.json(favorites);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/all_favorites/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const selectedFavorite = await save.findAll({
      where: { post_id: param },
    });
    res.json(selectedFavorite);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/all_favorites/favoritedUser/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const selectedFavorite = await save.findAll({
      where: { user_id: param },
      include: [{ model: post }, { model: user }],
    });
    res.json(selectedFavorite);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/all_favorites", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const post_id = req.body.post_id;

    const findFavorite = await save.findOne({
      where: { post_id: post_id, user_id: user_id },
    });
    if (findFavorite) {
      await save.destroy({ where: { post_id: post_id, user_id: user_id } });
      res.status(200).json({ message: "favorites removed" });
    } else {
      const createFavorite = await save.create({
        user_id,
        post_id,
      });
      res.status(201).json(createFavorite);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// /////////////////////////////// FOLLOWER ///////////////////////////////////

app.get("/all_followers", async (req, res) => {
  try {
    const followers = await follow.findAll();
    res.json(followers);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/all_followers", async (req, res) => {
  try {
    const user_follower_id = req.body.user_follower_id;
    const user_followed_id = req.body.user_followed_id;

    const findFollowers = await follow.findOne({
      where: {
        following_user_id: user_follower_id,
        followed_user_id: user_followed_id,
      },
    });
    if (findFollowers) {
      await follow.destroy({
        where: {
          following_user_id: user_follower_id,
          followed_user_id: user_followed_id,
        },
      });
      res.status(200).json({ message: "unfollow" });
    } else {
      const createdfollow = await follow.create({
        where: {
          following_user_id: user_follower_id,
          followed_user_id: user_followed_id,
        },
      });
      res.status(201).json(createdfollow);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT);

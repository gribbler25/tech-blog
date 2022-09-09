const router = require("express").Router();

const { User, Blog, Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

// get all blogs
router.get("/", (req, res) => {
  Blog.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "title", "blog_text", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a blog (POST a blog post)
router.post("/", (req, res) => {
  Blog.create({
    title: req.body.title,
    blog_text: req.body.blog_text,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find one blog by id
router.get("/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "blog_text", "title", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "user_id", "blog_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//edit a blog_text by id
router.put("/:id", (req, res) => {
  Blog.update({
    blog_text: req.body.blog_text,
    title: req.body.title,
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete a blog by id
router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;

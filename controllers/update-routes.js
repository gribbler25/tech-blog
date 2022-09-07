const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");

//render page with ONE blog incuding title and text that can be edited.
router.get("/blog/:id", (req, res) => {
  console.log(req.params);
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "blog_text", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      console.log(dbPostData);
      if (!dbPostData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      // serialize the data
      const blog = dbPostData.get({ plain: true });
      console.log(blog);
      // pass data to template,
      res.render("edit-blog", { blog, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

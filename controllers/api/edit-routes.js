const router = require("express").Router();

const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//render page with ONE blog incuding title and text that can be edited.
router.get("/:id", (req, res) => {
  console.log(req.params);
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "blog_text", "createdAt"],
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

//edit a blog by id
router.put("/:id", (req, res) => {
  Blog.update({
    where: {
      id: req.params.id,
    },
    blog_text: req.body.blog_text,
    title: req.body.title,
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

module.exports = router;

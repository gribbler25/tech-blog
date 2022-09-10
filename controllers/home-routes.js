const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");

//render all blogs on the homepage
router.get("/", (req, res) => {
  Blog.findAll({
    attributes: ["id", "title", "blog_text", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const blogs = dbPostData.map((blog) => blog.get({ plain: true }));

      // pass a single blog object into the homepage template
      res.render("homepage", { blogs, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login link
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//route to signup page in handlebars
router.get("/signup", (req, res) => {
  res.render("signup");
});

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
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "createdAt"],
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
      console.log(dbPostData);
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // serialize the data
      const blog = dbPostData.get({ plain: true });
      console.log(blog);
      // pass data to template,
      res.render("singleblog", { blog, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route to run when dashboard link pressed while logged in..display only the logged in user's blogs
router.get("/dashboard", (req, res) => {
  Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "blog_text", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "blog_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      console.log(dbPostData);
      // 'serialize'
      const blogs = dbPostData.map((blog) => blog.get({ plain: true }));
      console.log(blogs);
      res.render("dashboard", { blogs, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// //render page with ONE blog incuding title and text that can be edited.
// router.get("/edit/:id", (req, res) => {
//   console.log(req.params);
//   Blog.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "blog_text", "createdAt"],
//   })
//     .then((dbPostData) => {
//       console.log(dbPostData);
//       if (!dbPostData) {
//         res.status(404).json({ message: "No blog found with this id" });
//         return;
//       }
//       // serialize the data
//       const blog = dbPostData.get({ plain: true });
//       console.log(blog);
//       // pass data to template,
//       res.render("edit-blog", { blog, loggedIn: req.session.loggedIn });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/addBlog", (req, res) => res.render("addBlog", {}));

module.exports = router;

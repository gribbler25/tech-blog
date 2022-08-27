//code from module to model after...

const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const blogRoutes = require("./blog-routes.js");
const commentRoutes = require("./comment-routes.js");

router.use("/users", userRoutes);
router.use("/blogs", postRoutes);
router.use("/comments", commentRoutes);
module.exports = router;

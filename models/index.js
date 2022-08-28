//this is the relationships among the tables...one to many etc..
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// Comment.belongsTo(Blog, {
//   foreignKey: "blog_id",
//   onDelete: "SET NULL",
// });

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "SET NULL",
});

// User.hasMany(Blog, {
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });

// User.hasMany(Comment, {
//   foreignKey: "user_id",
//   onDelete: "SET NULL",
// });

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

module.exports = { User, Comment, Blog };

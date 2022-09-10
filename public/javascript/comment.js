//js logic for the singleblog.handlebars page.  handling the new comment form POST to /comments..then rendering the same singleblog page with the new added comment.

async function newCommentHandler(event) {
  event.preventDefault();
  const comment_text = document
    .querySelector('textarea[name="comment-buddy"]')
    .value.trim();

  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        blog_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);

// async function commentFormHandler(event) {
//   event.preventDefault();

//   const comment_text = document
//     .querySelector('textarea[name="comment-body"]')
//     .value.trim();

//   const post_id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

//   if (comment_text) {
//     const response = await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({
//         post_id,
//         comment_text,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// document
//   .querySelector(".comment-form")
//   .addEventListener("submit", commentFormHandler);

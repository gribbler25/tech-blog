//js logic for the singleblog.handlebars page.  handling the new comment form POST to /comments..then rendering the same singleblog page with the new added comment.

async function newCommentHandler(event) {
  event.preventDefault();
  const commentText = document.querySelector(".comment-buddy").value.trim();

  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/comments", {
    method: "post",
    body: JSON.stringify({
      commentText,
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

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);

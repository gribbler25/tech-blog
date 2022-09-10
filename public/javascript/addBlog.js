//handlling the add blog button on dashboard, rendering an add-blog.handlebars page when button clicked, then listen on the submit button to add the blog text/ title through the backend

async function addBlogHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value.trim();
  const blog_text = document
    .querySelector('textarea[name="blog-text"]')
    .value.trim();

  const response = await fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify({
      title,
      blog_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".add-blog-form")
  .addEventListener("submit", addBlogHandler);

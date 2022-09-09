// async function editBlogRender(event) {
//   event.preventDefault();
//   const button = document.getElementById("update-btn");
//   const id = button.getAttribute("data-id");
//   console.log(id);
//   await fetch(`dashboard/edit/${id}`, {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     console.log("edit blog!");
//   } else {
//     alert(response.statusText);
//   }
// }

async function updateFormHandler(event) {
  event.preventDefault();

  const blog_title = document
    .querySelector('input[name="blog-title"]')
    .value.trim();
  const blog_text = document
    .querySelector('textarea[name="blog-text"]')
    .value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(blog_title, blog_text, id);
  if (blog_title && blog_text) {
    await fetch(`/api/blogs/${id}`, {
      Method: "PUT",
      body: JSON.stringify({
        title: blog_title,
        blog_text: blog_text,
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
}

document
  .querySelector(".add-blog-form")
  .addEventListener("submit", updateFormHandler);

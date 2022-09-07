async function updateFormHandler(event) {
  event.preventDefault();

  // const review_text = document.querySelector('input[name="blog_text"]').value.trim();
  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];

  const button = document.getElementById("update-btn");
  const id = button.getAttribute("data-id");

  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({
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

// document
//   .querySelector("save-btn")
//   .addEventListener("submit", updateFormHandler);

document
  .querySelector("#update-btn")
  .addEventListener("click", updateFormHandler);

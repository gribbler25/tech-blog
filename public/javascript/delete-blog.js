async function deleteFormHandler(event) {
  event.preventDefault();
  const button = document.getElementById("delete-btn");
  const id = button.getAttribute("data-id");

  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);

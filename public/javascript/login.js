const { post } = require("../../controllers"); //??
// code from module which to model after?? add html class/id refs..route

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector().value.trim();

  const email = document.querySelector().value.trim();

  const password = document.querySelector().value.trim();

  if (username && email && password) {
    const response = await fetch("/api/...?", {
      method: post,
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("").addEventListener("submit", signupFormHandler);

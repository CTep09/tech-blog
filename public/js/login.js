// Login form submission handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Retrieve username and password values from the form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // If both username and password have values
  if (username && password) {
    // Send post request to server to authenticate user
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// Attach login form submission handler to form element
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

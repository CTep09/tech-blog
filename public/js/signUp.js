// Event handler for the signup form submission
const signupFormHandler = async (event) => {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get the values from the form inputs
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Send a POST request to the 'api/users' endpoint
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  // Check if the response is successful (status code 200-299)
  if (response.ok) {
    // Redirect the user to the dashboard page
    document.location.replace("/dashboard");
  } else {
    // Display an alert message if the signup failed
    alert("signup failed");
  }
};

// Add an event listener to the submit button click
document.querySelector(".form.login-form").addEventListener("submit", signupFormHandler);

// Event handler for the new post form submission
const newFormHandler = async function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  console.log(event)
  // Get values from the form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;
  console.log(title, body)

  // Send a POST request to the '/api/posts' endpoint
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });

  // Redirect the user to the dashboard page
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Post unsuccessful')
  }
};

// Add an event listener to the new post form submission
document.querySelector('#new-post-form').addEventListener('submit', newFormHandler)

const postId = document.querySelector('#delete-btn').dataset.post_id;

// Event handler for the edit post form submission
const editFormHandler = async function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  console.log(event);
  // Get values from the form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Send a POST request to the '/api/posts' endpoint
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });

  // Redirect the user to the dashboard page
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Post update unsuccessful");
  }
};

const deleteFormHandler = async function (event) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert('Unable to delete post')
  }

};

// Add an event listeners
document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-post-form")
  .addEventListener("click", deleteFormHandler);

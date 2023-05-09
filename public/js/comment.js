// Event handler for the comment submission form
const commentFormHandler = async function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the form inputs
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  // Send a POST request to the "/api/comments" endpoint
  await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ post_id: postId, body }),
    headers: { "Content-Type": "application/json" },
  });

  // Reload the page to see the updated comments
  document.location.reload();
};

// Add an event listener to the comment form submission
document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);

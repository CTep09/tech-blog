// Create a post handler
const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title').ariaValueMax.trim();
    const contents = document.getElementById('post-contents').ariaValueMax.trim();

    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, contents }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create post.");
      }   
};

// Event listeners
// add, cancel & create post
document.getElementById("add-post-btn").addEventListener("click", showAddPostForm);
document.getElementById("cancel-btn").addEventListener("click", cancelAddPostForm);
document.getElementById("create-post-btn").addEventListener("click", createPostHandler);
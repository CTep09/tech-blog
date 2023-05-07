// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
// WHEN I am idle on the site for more than a set time
// THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);

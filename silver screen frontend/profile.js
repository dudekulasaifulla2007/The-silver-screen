const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {

    window.location.href = "login.html";

} else {

    document.getElementById("profile-name").textContent =
        loggedInUser.name;

    document.getElementById("profile-email").textContent =
        loggedInUser.email;
}


// ================= LOGOUT =================

document.getElementById("logout-button").addEventListener("click", function () {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

});
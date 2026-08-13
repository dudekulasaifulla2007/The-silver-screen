// ================= SIGN UP =================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const user = {
            name: document.getElementById("signup-name").value,
            email: document.getElementById("signup-email").value,
            password: document.getElementById("signup-password").value
        };

        const response = await fetch(
            "https://the-silver-screen.onrender.com/api/users/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const result = await response.text();

        const message = document.getElementById("signup-message");

        message.textContent = result;

        if (result === "Signup Successful") {

            message.style.color = "#00c853";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        } else {

            message.style.color = "#ff5555";
        }

    });

}

// ================= LOGIN =================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const user = {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value
        };

        const response = await fetch(
            "https://the-silver-screen.onrender.com/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const result = await response.text();

        const message = document.getElementById("login-message");

        // ================= ACCOUNT DOESN'T EXIST =================

        if (result === "Account doesn't exist") {

            message.textContent = "Account doesn't exist";
            message.style.color = "#ff5555";

        }

        // ================= WRONG PASSWORD =================

        else if (result === "Invalid Email or Password") {

            message.textContent = "Invalid Email or Password";
            message.style.color = "#ff5555";

        }

        // ================= LOGIN SUCCESSFUL =================

        else {

            const loggedInUser = JSON.parse(result);

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(loggedInUser)
            );

            message.textContent = "Login Successful";
            message.style.color = "#00c853";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }

    });

}

/* ================= USERS ================= */
const users = JSON.parse(localStorage.getItem("users")) || [];

/* ================= LOGIN ================= */
const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const remember = document.getElementById("rememberMe");

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Save login session
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Remember user (optional)
    if (remember && remember.checked) {
      localStorage.setItem("rememberUser", email);
    } else {
      localStorage.removeItem("rememberUser");
    }

    // Redirect to home
    window.location.href = "index.html";
  });
}

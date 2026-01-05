/* ================= USERS ================= */
let users = JSON.parse(localStorage.getItem("users")) || [];

/* ================= SIGN UP ================= */
/* ================= SIGN UP ================= */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.signupName.value.trim();
    const email = signupForm.signupEmail.value.trim();
    const password = signupForm.signupPassword.value.trim();
    const confirm = signupForm.signupConfirmPassword.value.trim();

    if (!name || !email || !password || !confirm) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (users.some(u => u.email === email)) {
      alert("User already exists");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully 🎉");
    window.location.href = "login.html";
  });
}

/* ================= PASSWORD STRENGTH ================= */
const pwdInput = document.getElementById("signupPassword");
const bar = document.getElementById("strengthBar");
const text = document.getElementById("strengthText");

if (pwdInput && bar && text) {
  pwdInput.addEventListener("input", () => {
    const val = pwdInput.value;
    let strength = 0;

    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const levels = ["Weak", "Fair", "Good", "Strong"];
    const colors = ["#ff4d4d", "#ffa500", "#9acd32", "#1DB954"];

    bar.style.width = `${strength * 25}%`;
    bar.style.background = colors[strength - 1] || "#ff4d4d";
    text.innerText = levels[strength - 1] || "Too Weak";
  });
}

/* ================= SHOW / HIDE PASSWORD (FIXED) ================= */
document.querySelectorAll(".togglePwd").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.dataset.target;
    const input = document.getElementById(targetId);

    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      toggle.innerText = "🙈";
    } else {
      input.type = "password";
      toggle.innerText = "👁";
    }
  });
});

/* ================= LOGIN ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const remember = document.getElementById("rememberMe");

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (remember && remember.checked) {
      localStorage.setItem("rememberUser", email);
    } else {
      localStorage.removeItem("rememberUser");
    }

    window.location.href = "index.html";
  });
}

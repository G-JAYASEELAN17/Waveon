/* ================= AUTH ================= */
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) window.location.href = "login.html";

/* ================= ACCOUNT INFO ================= */
document.getElementById("accountName").innerText = user.name;
document.getElementById("accountEmail").innerText = user.email;

/* ================= TABS ================= */
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* ================= THEME TOGGLE ================= */
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

/*----------- back button  -----------*/
document.getElementById("backBtn").addEventListener("click", () => {
  window.history.back(); // Go to the previous page
});

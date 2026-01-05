/* ========== AUTH CHECK ========== */
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

if (!loggedUser) {
  window.location.href = "login.html";
}

/* ========== ELEMENTS ========== */
const form = document.getElementById("profileForm");
const nameInput = document.getElementById("profileName");
const emailInput = document.getElementById("profileEmail");
const genderInput = document.getElementById("profileGender");
const dobInput = document.getElementById("profileDOB");
const addressInput = document.getElementById("profileAddress");

const currentPwd = document.getElementById("currentPassword");
const newPwd = document.getElementById("newPassword");
const confirmPwd = document.getElementById("confirmPassword");

const avatarImg = document.getElementById("profileAvatar");
const avatarInput = document.getElementById("avatarInput");

/* ========== LOAD USER DATA ========== */
nameInput.value = loggedUser.name;
emailInput.value = loggedUser.email;
genderInput.value = loggedUser.gender || "";
dobInput.value = loggedUser.dob || "";
addressInput.value = loggedUser.address || "";

if (loggedUser.avatar) avatarImg.src = loggedUser.avatar;

/* ========== SAVE PROFILE ========== */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userIndex = users.findIndex(u => u.email === loggedUser.email);

  if (userIndex === -1) return alert("User not found");

  /* PASSWORD CHANGE */
  if (newPwd.value || confirmPwd.value) {

    if (!currentPwd.value) {
      return alert("Enter current password");
    }

    if (currentPwd.value !== users[userIndex].password) {
      return alert("Current password incorrect");
    }

    if (newPwd.value.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (newPwd.value !== confirmPwd.value) {
      return alert("Passwords do not match");
    }

    users[userIndex].password = newPwd.value;
  }

  /* UPDATE DATA */
  users[userIndex] = {
    ...users[userIndex],
    name: nameInput.value,
    email: emailInput.value,
    gender: genderInput.value,
    dob: dobInput.value,
    address: addressInput.value
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));

  alert("Profile updated successfully ✅");

  currentPwd.value = newPwd.value = confirmPwd.value = "";
});

/* ========== SHOW / HIDE PASSWORD ========== */
document.querySelectorAll(".togglePwd").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
    icon.textContent = input.type === "password" ? "👁" : "🙈";
  });
});

/* ========== AVATAR UPLOAD ========== */
avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatarImg.src = reader.result;

    users.forEach(u => {
      if (u.email === loggedUser.email) {
        u.avatar = reader.result;
      }
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(users.find(u => u.email === loggedUser.email)));
  };

  reader.readAsDataURL(file);
});

/* ========== FORGOT PASSWORD ========== */
document.getElementById("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Password reset link sent to your email 📧 (UI only)");
});

/* ========== BACK & LOGOUT ========== */
document.getElementById("backBtn").onclick = () => history.back();
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
};

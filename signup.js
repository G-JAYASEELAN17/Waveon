// signup.js
document.querySelector('.signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    
    if (password === confirmPassword) {
        // Proceed with user registration (for now we will just log it)
        console.log("User signed up with email:", email);

        // Redirect to the login page after successful signup
        window.location.href = 'login.html';
    } else {
        alert('Passwords do not match!');
    }
});
// Back Button functionality
document.getElementById("backBtn").addEventListener("click", () => {
  window.history.back(); // Takes the user to the previous page in the browser history
});



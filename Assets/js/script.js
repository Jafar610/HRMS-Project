// Client-side validation for Reset Password form
    document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = this;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;

    // Reset previous validation states
    form.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('is-invalid');
    });

    // Validate password length
    if (newPassword.length < 8) {
        document.getElementById('newPassword').classList.add('is-invalid');
        isValid = false;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
        document.getElementById('confirmPassword').classList.add('is-invalid');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission (replace with actual backend logic)
        alert('Password reset successfully!');
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal')).hide();
    }
    });
   
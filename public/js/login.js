document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location.href = '/dashboard'; // Redirect to dashboard on successful login.
            } else {
                alert('Failed to log in');
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     const profileForm = document.querySelector('#profile-form');

//     profileForm.addEventListener('submit', async function(e) {
//         e.preventDefault();

//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.querySelector('#profile-form');

    profileForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(profileForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
        };

        try {
            const response = await fetch('/users/profile', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Profile updated successfully');
                window.location.reload(); // Reloads the page to show updated profile.
            } else {
                alert('Failed to update profile');
            }
        } catch (err) {
            console.error('Profile update failed:', err);
        }
    });
});

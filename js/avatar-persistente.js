document.addEventListener("DOMContentLoaded", () => {
    const avatars = document.querySelectorAll('.avatar, .avatar-large');
    const savedAvatar = localStorage.getItem('userAvatar');

    if (savedAvatar) {
        avatars.forEach(el => {
            el.style.backgroundImage = `url(${savedAvatar})`;
            el.textContent = '';
        });
    }

    document.body.addEventListener('avatarUpdated', () => {
        const newAvatar = localStorage.getItem('userAvatar');
        avatars.forEach(el => {
            el.style.backgroundImage = `url(${newAvatar})`;
            el.textContent = '';
        });
    });
});
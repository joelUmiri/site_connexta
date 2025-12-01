document.addEventListener("DOMContentLoaded", () => {
    const uploadLogo = document.getElementById('uploadLogo');
    const avatarLarge = document.getElementById('avatarLarge');
    const avatarSidebar = document.getElementById('avatarPreview');

    uploadLogo.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const imgUrl = ev.target.result;
                avatarLarge.style.backgroundImage = `url(${imgUrl})`;
                avatarLarge.textContent = '';
                avatarSidebar.textContent = '';
                avatarSidebar.style.backgroundImage = `url(${imgUrl})`;

                localStorage.setItem('empresaLogo', imgUrl);
                document.body.dispatchEvent(new Event('avatarUpdated'));
            };
            reader.readAsDataURL(file);
        }
    });

    const logoSalva = localStorage.getItem('empresaLogo');
    if (logoSalva) {
        avatarLarge.style.backgroundImage = `url(${logoSalva})`;
        avatarLarge.textContent = '';
        avatarSidebar.style.backgroundImage = `url(${logoSalva})`;
        avatarSidebar.textContent = '';
    }

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Informações da empresa atualizadas com sucesso!');
        });
    });
});
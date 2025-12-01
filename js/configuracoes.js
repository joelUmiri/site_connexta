document.addEventListener("DOMContentLoaded", () => {
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarLarge = document.getElementById('avatarLarge');
    const uploadInput = document.getElementById('uploadPhoto');

    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = ev.target.result;
                avatarPreview.textContent = '';
                avatarPreview.style.backgroundImage = `url(${img})`;
                avatarPreview.style.backgroundSize = 'cover';
                avatarLarge.textContent = '';
                avatarLarge.style.backgroundImage = `url(${img})`;
                avatarLarge.style.backgroundSize = 'cover';
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log('Dados salvos:', data);
        alert('Perfil atualizado com sucesso!');
    });

    document.getElementById('changePassword').addEventListener('click', () => {
        alert('Funcionalidade de troca de senha em desenvolvimento');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const uploadInput = document.getElementById('uploadPhoto');

    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const imgUrl = ev.target.result;

                document.getElementById('avatarPreview').style.backgroundImage = `url(${imgUrl})`;
                document.getElementById('avatarPreview').textContent = '';
                document.getElementById('avatarLarge').style.backgroundImage = `url(${imgUrl})`;
                document.getElementById('avatarLarge').textContent = '';

                localStorage.setItem('userAvatar', imgUrl);

                document.body.dispatchEvent(new Event('avatarUpdated'));
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log('Dados salvos:', data);
        alert('Perfil atualizado com sucesso!');
    });

    document.getElementById('changePassword').addEventListener('click', () => {
        alert('Funcionalidade de troca de senha em desenvolvimento');
    });
});
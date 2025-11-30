// js/configuracoes.js – tudo funcional e pronto pra API
document.addEventListener("DOMContentLoaded", () => {
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarLarge = document.getElementById('avatarLarge');
    const uploadInput = document.getElementById('uploadPhoto');

    // Upload de foto
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

    // Salvar perfil
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        // AQUI VAI SUA API
        console.log('Dados salvos:', data);
        alert('Perfil atualizado com sucesso!');
    });

    // Alterar senha (abre modal ou redireciona)
    document.getElementById('changePassword').addEventListener('click', () => {
        alert('Funcionalidade de troca de senha em desenvolvimento');
    });
});// js/configuracoes.js – tudo funcional e pronto pra API
document.addEventListener("DOMContentLoaded", () => {
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarLarge = document.getElementById('avatarLarge');
    const uploadInput = document.getElementById('uploadPhoto');

    // Upload de foto
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

    // Salvar perfil
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        // AQUI VAI SUA API
        console.log('Dados salvos:', data);
        alert('Perfil atualizado com sucesso!');
    });

    // Alterar senha (abre modal ou redireciona)
    document.getElementById('changePassword').addEventListener('click', () => {
        alert('Funcionalidade de troca de senha em desenvolvimento');
    });
});
// Troca de tipo (Investidor / Empresa)
document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Login
document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const isCompany = document.querySelector('[data-type="company"]').classList.contains('active');
    const endpoint = isCompany ? '/api/auth/login/company' : '/api/auth/login/investor';

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();

        if (res.ok) {
            localStorage.setItem('token', json.token);
            localStorage.setItem('userType', isCompany ? 'company' : 'investor');
            location.href = isCompany ? 'dashboard-empresa.html' : 'dashboard-investidor.html';
        } else {
            alert(json.message || 'E-mail ou senha incorretos');
        }
    } catch {
        alert('Erro de conexão');
    }
});
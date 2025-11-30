// ==================== MÁSCARAS BRASILEIRAS (funciona em ambas as páginas) ====================
document.querySelectorAll('input[name="cpf"], input[name="responsible_cpf"]').forEach(input => {
    input.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    });
});

document.querySelectorAll('input[name="cnpj"]').forEach(input => {
    input.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = v;
    });
});

document.querySelectorAll('input[name="phone"]').forEach(input => {
    input.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length <= 10) {
            v = v.replace(/(\d{2})(\d)/, '($1) $2');
            v = v.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            v = v.replace(/(\d{2})(\d)/, '($1) $2');
            v = v.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = v;
    });
});

// ==================== ENVIO PARA API (detecta automaticamente qual formulário está na página) ====================
const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(this));

        // Validação rápida de senha
        if (data.password !== data.password_confirm) {
            return alert('As senhas não coincidem');
        }
        delete data.password_confirm;

        // Detecta automaticamente o tipo de cadastro pela URL ou por um campo escondido
        const isInvestor = location.pathname.includes('investidor') || document.querySelector('input[name="birth_date"]');
        const endpoint = isInvestor
            ? '/api/auth/register/investor'
            : '/api/auth/register/company';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            if (res.ok) {
                alert('Cadastro realizado com sucesso! Bem-vindo à Connexta');
                // Redireciona conforme o tipo
                window.location.href = isInvestor ? '/dashboard-investidor.html' : '/dashboard-empresa.html';
            } else {
                alert(json.message || 'Erro no cadastro. Verifique os dados.');
            }
        } catch (err) {
            alert('Erro de conexão. Tente novamente.');
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById('listaPedidos');

    function carregarPedidos() {
        const pedidos = JSON.parse(localStorage.getItem('pedidosInvestimento') || '[]');

        if (pedidos.length === 0) {
            lista.innerHTML = '<div class="pedido-vazio"><p>Aguardando primeiros investidores...</p></div>';
            return;
        }

        lista.innerHTML = '';
        pedidos.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'investment-card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                    <div>
                        <div class="investor" style="font-size:20px; font-weight:600;">${p.investidor}</div>
                        <div class="amount" style="font-size:24px; color:#FF297D;">${p.valor}</div>
                        <div class="date" style="color:#aaa; font-size:14px;">${p.data}</div>
                    </div>
                    <div style="text-align:right;">
                        <div class="status pending">Pendente</div>
                        <div style="margin-top:12px;">
                            <button class="btn small primary btn-aceitar" data-id="${p.id}">
                                Aceitar
                            </button>
                            <button class="btn small outline btn-recusar" data-id="${p.id}">
                                Recusar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            lista.appendChild(card);
        });

        document.querySelectorAll('.btn-recusar').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                if (confirm('Tem certeza que deseja recusar este investimento?')) {
                    let pedidosAtualizados = pedidos.filter(p => p.id != id);
                    localStorage.setItem('pedidosInvestimento', JSON.stringify(pedidosAtualizados));

                    btn.closest('.investment-card').style.transition = 'all 0.5s';
                    btn.closest('.investment-card').style.opacity = '0';
                    btn.closest('.investment-card').style.transform = 'translateX(-100px)';

                    setTimeout(() => carregarPedidos(), 500);
                }
            });
        });

        document.querySelectorAll('.btn-aceitar').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Funcionalidade de aceite com contrato automático em desenvolvimento!');
            });
        });
    }

    carregarPedidos();
    setInterval(carregarPedidos, 8000);
});
document.addEventListener("DOMContentLoaded", () => {
    const listaPedidos = document.getElementById('listaPedidos');

    document.querySelectorAll('.captacao-tabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.captacao-tabs .tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    function carregarPedidos() {
        const pedidos = JSON.parse(localStorage.getItem('pedidosInvestimento') || '[]');
        if (pedidos.length === 0) {
            listaPedidos.innerHTML = '<div class="pedido-vazio"><p>Aguardando primeiros investidores...</p></div>';
            return;
        }

        listaPedidos.innerHTML = '';
        pedidos.forEach(p => {
            const card = document.createElement('div');
            card.className = 'investment-card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                    <div>
                        <div class="investor" style="font-size:20px; font-weight:600;">${p.investidor}</div>
                        <div class="amount" style="font-size:24px; color:#FF297D;">${p.valor}</div>
                        <div class="date" style="color:#aaa;">${p.data}</div>
                    </div>
                    <div style="text-align:right;">
                        <div class="status pending">Pendente</div>
                        <div style="margin-top:12px;">
                            <button class="btn small primary btn-aceitar" data-id="${p.id}">Aceitar</button>
                            <button class="btn small outline btn-recusar" data-id="${p.id}">Recusar</button>
                        </div>
                    </div>
                </div>
            `;
            listaPedidos.appendChild(card);
        });

        document.querySelectorAll('.btn-recusar').forEach(btn => {
            btn.onclick = () => {
                if (confirm('Recusar este investimento?')) {
                    const id = btn.dataset.id;
                    let novos = pedidos.filter(x => x.id != id);
                    localStorage.setItem('pedidosInvestimento', JSON.stringify(novos));
                    carregarPedidos();
                }
            };
        });
    }

    carregarPedidos();
    setInterval(carregarPedidos, 8000);
});
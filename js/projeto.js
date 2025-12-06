import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = urlParams.get('id');

    if (!projetoId) {
        alert("Erro: Projeto não encontrado.");
        return;
    }

    const nomeProjeto = document.getElementById('nomeProjeto');
    const descricaoProjeto = document.getElementById('descricaoProjeto');
    const setorProjeto = document.getElementById('setorProjeto');
    const metaProjeto = document.getElementById('metaProjeto');
    const captadoProjeto = document.getElementById('captadoProjeto');
    const investidoresProjeto = document.getElementById('investidoresProjeto');
    const progressoBar = document.querySelector('#progressoBar');
    const sobreProjeto = document.getElementById('sobreProjeto');
    const modalNomeProjeto = document.getElementById('modalNomeProjeto');

    const investirBtn = document.getElementById('investirBtn');
    const modal = document.getElementById('investModal');
    const closeBtn = document.querySelector('.close');
    const inputValor = document.getElementById('valorInvestimento');
    const checkboxTermos = document.getElementById('aceitoTermos');
    const confirmarBtn = document.getElementById('confirmarInvestimento');
    const cancelarBtn = document.getElementById('cancelarInvestimento');

    let projeto = null;

    try {
        const docRef = doc(db, "projects", projetoId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) throw new Error("Projeto não encontrado.");

        projeto = docSnap.data();
        projeto.id = docSnap.id;

        nomeProjeto.textContent = projeto.nome;
        descricaoProjeto.textContent = projeto.descricao || "Sem descrição disponível.";
        setorProjeto.textContent = projeto.categoria || "Geral";
        metaProjeto.textContent = `R$ ${Number(projeto.meta).toLocaleString('pt-BR')}`;
        captadoProjeto.textContent = `R$ ${Number(projeto.captado || 0).toLocaleString('pt-BR')}`;
        investidoresProjeto.textContent = projeto.investidores || 0;
        modalNomeProjeto.textContent = projeto.nome;
        if (projeto.sobre) sobreProjeto.textContent = projeto.sobre;

        const progresso = projeto.meta ? Math.round((projeto.captado / projeto.meta) * 100) : 0;
        progressoBar.style.width = `${progresso}%`;

        const img = document.querySelector('.project-image-large');
        if (projeto.imagem) {
            img.style.backgroundImage = `url(${projeto.imagem})`;
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
            img.classList.add('loaded');   
        } else {
            img.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            img.classList.add('loaded');   
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao carregar projeto.");
        return;
    }

    const valorMinimo = projeto.valorMinimo || 5000;
    const multiplicadorRetorno = projeto.retornoMultiplicador || 4.0;

    document.querySelectorAll('.simulador-item strong')[0].textContent =
        `R$ ${valorMinimo.toLocaleString('pt-BR')}`;

    investirBtn.onclick = () => {
        modal.classList.add('active');
        inputValor.value = `R$ ${valorMinimo.toLocaleString('pt-BR')}`;
        atualizarSimulador();
    };

    const fecharModal = () => modal.classList.remove('active');
    closeBtn.onclick = fecharModal;
    cancelarBtn.onclick = fecharModal;
    window.onclick = (e) => { if (e.target === modal) fecharModal(); };

    inputValor.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        v = (v / 100).toFixed(2).replace(".", ",");
        v = v.replace(/(\d)(?=(\d{3})+,)/g, '$1.');
        e.target.value = v ? `R$ ${v}` : '';
        atualizarSimulador();
    });

    function atualizarSimulador() {
        const valor = parseInt(inputValor.value.replace(/\D/g, '') || '0');
        const participacao = ((valor / projeto.meta) * 100).toFixed(4);
        const retorno = valor * multiplicadorRetorno;

        document.getElementById('participacao').textContent = `${participacao}%`;
        document.getElementById('retorno').textContent =
            `R$ ${retorno.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;

        confirmarBtn.disabled = (valor < valorMinimo || !checkboxTermos.checked);
    }

    checkboxTermos.onchange = atualizarSimulador;

    confirmarBtn.onclick = () => {
        const valorFinal = inputValor.value;

        const novoPedido = {
            id: Date.now(),
            projetoId: projeto.id,
            projeto: projeto.nome,
            investidor: "João Silva",
            email: "joao@exemplo.com",
            valor: valorFinal,
            data: new Date().toLocaleString('pt-BR'),
            status: "Pendente"
        };

        let pedidos = JSON.parse(localStorage.getItem('pedidosInvestimento') || '[]');
        pedidos.unshift(novoPedido);
        localStorage.setItem('pedidosInvestimento', JSON.stringify(pedidos));

        alert(`Solicitação de investimento enviada com sucesso! Aguardando aprovação da startup.`);
        fecharModal();
    };

    atualizarSimulador();
});
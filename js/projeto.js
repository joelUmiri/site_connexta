// js/projeto.js – Versão FINAL com formatação CLEAN (50 mil · 1,23 mi · 2,45 bi)

import { db } from '../js/firebase.js';
import { doc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// === FUNÇÃO DE FORMATAÇÃO LIMPA (a que você pediu e aprovou) ===
function formatar(valor) {
    if (isNaN(valor) || valor === null) return '0';

    const abs = Math.abs(valor);

    if (abs >= 1_000_000_000_000) {
        return (valor / 1_000_000_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' tri';
    }
    if (abs >= 1_000_000_000) {
        return (valor / 1_000_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' bi';
    }
    if (abs >= 1_000_000) {
        return (valor / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' mi';
    }
    if (abs >= 1_000) {
        return (valor / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' mil';
    }
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// === FUNÇÃO DO SIMULADOR ===
function atualizarSimulador() {
    const valorInvestido = Number(document.getElementById('valorInvestimento').dataset.raw || 0);
    const multiplicador = Number(document.getElementById('retornoMultiplicador').textContent);
    const retorno = valorInvestido * multiplicador;

    document.getElementById('valorInvestido').textContent = formatar(valorInvestido);
    document.getElementById('valorRetorno').textContent = formatar(retorno);
}

// === CARREGA PROJETO AO ABRIR PÁGINA ===
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projetoId = urlParams.get('id');

    if (!projetoId) {
        document.getElementById('nomeProjeto').textContent = 'Erro: ID não encontrado';
        return;
    }

    try {
        const projectRef = doc(db, "projects", projetoId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
            document.getElementById('nomeProjeto').textContent = 'Projeto não encontrado';
            return;
        }

        const p = projectSnap.data();

        // Preenche os dados na tela com a formatação limpa
        document.getElementById('nomeProjeto').textContent = p.nome || 'Sem nome';
        document.getElementById('descricaoProjeto').textContent = p.descricao || 'Sem descrição';
        document.getElementById('setorProjeto').textContent = p.categoria || 'Geral';
        document.getElementById('metaProjeto').textContent = formatar(p.meta || 0);
        document.getElementById('captadoProjeto').textContent = formatar(p.captado || 0);
        document.getElementById('investidoresProjeto').textContent = p.investidores || 0;

        const porcentagem = p.meta ? Math.round((p.captado / p.meta) * 100) : 0;
        document.getElementById('progressoProjeto').textContent = `${porcentagem}%`;
        document.querySelector('.progress-fill').style.width = `${porcentagem}%`;

        document.querySelector('.project-image-large').style.background = p.imagem || 'linear-gradient(135deg, #00c48c, #009966)';
        document.getElementById('sobreProjeto').innerHTML = p.sobre || 'Descrição detalhada do projeto...';

        // Configura simulador
        const valorMinimo = p.valorMinimo || 5000;
        const retornoMultiplicador = p.retornoMultiplicador || 3.75;

        document.getElementById('valorMinimoInvestimento').textContent = formatar(valorMinimo);
        document.getElementById('retornoMultiplicador').textContent = retornoMultiplicador.toFixed(2).replace('.', ',');

        // Modal
        const modal = document.getElementById('modalInvestimento');
        const inputValor = document.getElementById('valorInvestimento');

        // Formata input como moeda (mas guarda valor bruto no dataset)
        inputValor.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            valor = (valor / 100).toFixed(2);
            e.target.dataset.raw = valor.replace('.', '');

            const formatado = Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            e.target.value = formatado;

            atualizarSimulador();
        });

        // Abre modal
        document.getElementById('btnInvestir').addEventListener('click', () => {
            inputValor.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorMinimo);
            inputValor.dataset.raw = valorMinimo;
            atualizarSimulador();
            modal.style.display = 'flex';
        });

        // Fecha modal
        document.getElementById('cancelarInvestimento').addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

        // Confirmar investimento (salva no localStorage por enquanto)
        document.getElementById('confirmarInvestimento').addEventListener('click', async () => {
            if (!document.getElementById('aceitoTermos').checked) {
                alert('Você precisa aceitar os termos');
                return;
            }

            const valor = Number(inputValor.dataset.raw);
            if (valor < valorMinimo) {
                alert(`Valor mínimo é abaixo do mínimo (${formatar(valorMinimo)})`);
                return;
            }

            // Salva no localStorage (pra dashboard da empresa ver depois)
            const investimentos = JSON.parse(localStorage.getItem('investimentos_pendentes') || '[]');
            investimentos.push({
                projetoId,
                projetoNome: p.nome,
                valor,
                data: new Date().toISOString(),
                status: 'pendente'
            });
            localStorage.setItem('investimentos_pendentes', JSON.stringify(investimentos));

            alert(`Investimento de ${formatar(valor)} confirmado! Aguarde aprovação.`);
            modal.style.display = 'none';
        });

    } catch (error) {
        console.error("Erro ao carregar projeto:", error);
        document.getElementById('nomeProjeto').textContent = 'Erro ao carregar projeto';
    }
});
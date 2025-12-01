document.addEventListener("DOMContentLoaded", () => {
    const projetoId = localStorage.getItem('projetoAtual') || '1';

    const projetos = {
        '1': { nome: "MediFlow", descricao: "Plataforma de telemedicina com IA...", setor: "Saúde", meta: "R$ 2.000.000", captado: "R$ 1.780.000", investidores: 127, progresso: 89, sobre: "A MediFlow nasceu com o objetivo...", imagem: "#FF297D", valorMinimo: 5000, retornoMultiplicador: 3.75 },
        '2': { nome: "PixBank", descricao: "Banco digital completo...", setor: "Fintech", meta: "R$ 5.000.000", captado: "R$ 3.600.000", investidores: 289, progresso: 72, sobre: "O PixBank oferece conta PJ gratuita...", imagem: "#34A853", valorMinimo: 10000, retornoMultiplicador: 4.2 },
        '3': { nome: "EcoPower", descricao: "Energia solar acessível...", setor: "Sustentabilidade", meta: "R$ 2.500.000", captado: "R$ 2.350.000", investidores: 312, progresso: 94, sobre: "Somos a maior plataforma de energia solar...", imagem: "#4285F4", valorMinimo: 5000, retornoMultiplicador: 5.1 },
        '4': { nome: "LearnPro", descricao: "Cursos online com mentoria...", setor: "Educação", meta: "R$ 2.000.000", captado: "R$ 900.000", investidores: 89, progresso: 45, sobre: "LearnPro conecta alunos com mentores...", imagem: "#FBBC05", valorMinimo: 5000, retornoMultiplicador: 3.4 }
    };

    const p = projetos[projetoId] || projetos['1'];

    document.getElementById('nomeProjeto').textContent = p.nome;
    document.getElementById('descricaoProjeto').textContent = p.descricao;
    document.getElementById('setorProjeto').textContent = p.setor;
    document.getElementById('metaProjeto').textContent = p.meta;
    document.getElementById('captadoProjeto').textContent = p.captado;
    document.getElementById('investidoresProjeto').textContent = p.investidores;
    document.getElementById('barraProgresso').style.width = p.progresso + '%';
    document.getElementById('sobreTexto').textContent = p.sobre;
    document.querySelector('.project-image-large').style.background = p.imagem;

    const modal = document.getElementById('modalInvestir');
    const btnInvestir = document.getElementById('btnInvestir');
    const inputValor = document.getElementById('valorInvestimento');
    const checkboxTermos = document.getElementById('aceitoTermos');
    const confirmarBtn = document.getElementById('confirmarInvestimento');

    btnInvestir.addEventListener('click', () => {
        document.getElementById('modalNomeProjeto').textContent = p.nome;
        inputValor.value = `R$ ${p.valorMinimo.toLocaleString('pt-BR')}`;
        modal.style.display = 'flex';
        atualizarSimulador();
    });

    document.getElementById('fecharModal').onclick = 
    document.getElementById('cancelarInvestimento').onclick = () => {
        modal.style.display = 'none';
    };

    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    inputValor.addEventListener('input', () => {
        let v = inputValor.value.replace(/\D/g, '');
        if (!v) v = '0';
        inputValor.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v / 100);
        atualizarSimulador();
    });

    function atualizarSimulador() {
        const valorStr = inputValor.value.replace(/\D/g, '') || '0';
        const valor = parseInt(valorStr);
        const metaTotal = parseFloat(p.meta.replace(/\D/g, ''));
        const participacao = ((valor / metaTotal) * 100).toFixed(4);
        const retorno = valor * p.retornoMultiplicador;

        document.getElementById('participacao').textContent = participacao + '%';
        document.getElementById('retorno').textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(retorno);
        confirmarBtn.disabled = (valor < p.valorMinimo || !checkboxTermos.checked);
    }

    checkboxTermos.addEventListener('change', atualizarSimulador);

    confirmarBtn.addEventListener('click', () => {
        const valorFinal = inputValor.value;
        const investidorNome = "João Silva";  
        const investidorEmail = "joao@exemplo.com";
        const dataAtual = new Date().toLocaleString('pt-BR');

        const novoPedido = {
            id: Date.now(),
            projeto: p.nome,
            investidor: investidorNome,
            email: investidorEmail,
            valor: valorFinal,
            data: dataAtual,
            status: "Pendente"
        };

        let pedidos = JSON.parse(localStorage.getItem('pedidosInvestimento') || '[]');
        pedidos.unshift(novoPedido);
        localStorage.setItem('pedidosInvestimento', JSON.stringify(pedidos));

        alert(`Investimento de ${valorFinal} em ${p.nome} enviado com sucesso!\n\nA startup receberá seu pedido agora.\nVocê será notificado por e-mail quando for aceito.`);

        modal.style.display = 'none';
    });
});
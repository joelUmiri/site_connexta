document.addEventListener("DOMContentLoaded", async () => {
    const projectsGrid = document.getElementById("projects-grid"); // certifique-se de ter esse ID no HTML
    const loading = document.getElementById("loading-message");   // opcional: div com id="loading-message"

    if (loading) loading.style.display = "block";

    try {
        const snapshot = await firebase.firestore().collection("projects").get();
        const projetos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        projectsGrid.innerHTML = ""; // limpa

        projetos.forEach((projeto, i) => {
            const progresso = projeto.meta ? Math.min((projeto.captado || 0) / projeto.meta * 100, 100) : 0;

            // CORES POR TIPO (aqui você controla tudo)
            const cores = {
                "Saúde": "#FF297D",
                "Fintech": "#34A853",
                "Sustentabilidade": "#4285F4",
                "Educação": "#FBBC05",
                "Tecnologia": "#667eea",
                "Imobiliário": "#9C27B0",
                "Games": "#E91E63",
                "Agritech": "#8BC34A",
                "Mobilidade": "#00BCD4"
            };
            const cor = cores[projeto.tipo] || cores[projeto.categoria] || "#667eea";

            const cardHTML = `
                <div class="project-card" data-sector="${projeto.categoria || 'Tecnologia'}" onclick="abrirProjeto('${projeto.id}')"
                     style="opacity:0; transform:translateY(30px)">
                    <div class="project-image" style="background: ${cor}; background-size:cover; background-position:center;">
                        ${projeto.imagem ? `<img src="${projeto.imagem}" style="width:100%; height:100%; object-fit:cover;">` : ''}
                    </div>
                    <div class="project-info">
                        <h3>${projeto.nome}</h3>
                        <p>${projeto.descricao ? projeto.descricao.substring(0, 90) + "..." : "Sem descrição..."}</p>
                        <span class="tag">${projeto.categoria || "Tecnologia"}</span>
                        ${projeto.destaque ? '<span class="hot">EM ALTA</span>' : ''}
                        <div class="progress"><div class="progress-bar" style="width:${progresso}%"></div></div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-weight:600; font-size:15px;">
                            <span><strong style="color:#FF297D">R$ ${(projeto.captado || 0).toLocaleString('pt-BR')}</strong> captados</span>
                            <span style="color:#aaa">de R$ ${projeto.meta.toLocaleString('pt-BR')}</span>
                        </div>
                        ${projeto.investidores ? `<small style="color:#888; float:right; margin-top:4px">${projeto.investidores} investidores</small>` : ''}
                    </div>
                </div>
            `;

            projectsGrid.innerHTML += cardHTML;
        });

        // Animação de entrada (sua animação original, só que agora com os cards novos)
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            card.style.transition = "all 0.7s ease-out";
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, i * 120);
        });

        if (loading) loading.style.display = "none";

    } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        projectsGrid.innerHTML = "<p style='text-align:center; color:#aaa'>Erro ao carregar projetos.</p>";
    }
});

// FILTROS (mantive sua lógica original)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const sector = btn.dataset.sector;
        document.querySelectorAll('.project-card').forEach(card => {
            if (sector === 'todos' || card.dataset.sector === sector) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

function abrirProjeto(id) {
    localStorage.setItem('projetoAtual', id);
    window.location.href = '../html/projeto.html';
}
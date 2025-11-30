// js/feed.js – Animação idêntica ao dashboard + filtro com transição suave
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card');
    const filters = document.querySelectorAll('.filter-btn');

    // Função que aplica a animação de entrada (igual ao dashboard)
    const animateCards = (cardElements) => {
        cardElements.forEach((card, i) => {
            // Reseta estado
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "all 0.7s ease-out";

            // Mostra com delay progressivo
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, i * 120);
        });
    };

    // Animação inicial ao carregar a página
    animateCards(cards);

    // Filtro por setor
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualiza botão ativo
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const sector = btn.dataset.sector;
            const visibleCards = [];

            cards.forEach((card, i) => {
                // Anima saída
                card.style.opacity = "0";
                card.style.transform = "translateY(30px)";

                setTimeout(() => {
                    if (sector === 'todos' || card.dataset.sector === sector) {
                        card.style.display = 'block';
                        visibleCards.push(card);
                    } else {
                        card.style.display = 'none';
                    }

                    // Depois de todos processados, anima entrada dos visíveis
                    if (i === cards.length - 1) {
                        setTimeout(() => animateCards(visibleCards), 100);
                    }
                }, i * 50);
            });
        });
    });
});
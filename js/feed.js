document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card');
    const filters = document.querySelectorAll('.filter-btn');

    const animateCards = (cardElements) => {
        cardElements.forEach((card, i) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "all 0.7s ease-out";
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, i * 120);
        });
    };
    animateCards(cards);

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sector = btn.dataset.sector;
            const visibleCards = [];

            cards.forEach((card, i) => {
                card.style.opacity = "0";
                card.style.transform = "translateY(30px)";
                setTimeout(() => {
                    if (sector === 'todos' || card.dataset.sector === sector) {
                        card.style.display = 'block';
                        visibleCards.push(card);
                    } else {
                        card.style.display = 'none';
                    }
                    if (i === cards.length - 1) {
                        setTimeout(() => animateCards(visibleCards), 100);
                    }
                }, i * 50);
            });
        });
    });
});

function abrirProjeto(id) {
    localStorage.setItem('projetoAtual', id);
    window.open('../html/projeto.html', '_self');
}
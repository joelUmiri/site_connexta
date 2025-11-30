// js/navigation-animation.js
// Animação idêntica em TODAS as páginas ao trocar de tela via menu
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona TODOS os itens que precisam animar (cards, sections, etc)
    const animatedElements = document.querySelectorAll(`
        .card,
        .investment-card,
        .project-card,
        .settings-section,
        .filters,
        header,
        .profile-photo,
        .toggle
    `);

    // Reseta tudo pra animar de novo
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.7s ease-out";
    });

    // Aplica a animação com delay progressivo (igual ao dashboard)
    animatedElements.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, i * 100);
    });
});
document.addEventListener("DOMContentLoaded", () => {
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

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.7s ease-out";
    });

    animatedElements.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, i * 100);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.card, .investment-card').forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        setTimeout(() => {
            el.style.transition = "all 0.7s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, i * 120);
    });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        setTimeout(() => {
            bar.style.width = bar.parentElement.style.width || bar.style.width;
        }, 600);
    });
});
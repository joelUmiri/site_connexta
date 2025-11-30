document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "-1";
    document.body.prepend(canvas);

    let particles = [];
    const particleCount = 70;
    const maxDistance = 150;
    let mouseX = -9999; 
    let mouseY = -9999;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.8;
            this.baseSpeedX = Math.random() * 0.4 - 0.2;
            this.baseSpeedY = Math.random() * 0.4 - 0.2;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
        }

        update() {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.hypot(dx, dy);

            if (distance < 180) {
                const force = (180 - distance) / 180;           
                const push = force * 0.25;                             
                this.speedX += (dx / distance) * push;
                this.speedY += (dy / distance) * push;
            }

            this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
            this.speedY += (this.baseSpeedY - this.speedY) * 0.02;

            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = "rgba(255, 41, 125, 0.8)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);

                if (dist < maxDistance) {
                    ctx.strokeStyle = `rgba(255, 41, 125, ${1 - dist/maxDistance * 0.7})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
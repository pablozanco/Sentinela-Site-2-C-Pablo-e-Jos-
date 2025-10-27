const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const scannerBtn = document.querySelector(".scanner-btn");
const loginBtn = document.querySelector(".login-btn");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", () => {
    canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
});

const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
}));

function animateParticles() {
    ctx.fillStyle = "rgba(13,13,13,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,215,0,0.7)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

scannerBtn.addEventListener("click", () => {
    window.location.href = "scanner.html";
});

window.addEventListener("load", () => {
    const animateCards = cards => {
        cards.forEach((c, i) => {
            c.style.opacity = 0;
            c.style.transform = "translateY(20px)";
            setTimeout(() => {
                c.style.transition = "all 0.6s ease";
                c.style.opacity = 1;
                c.style.transform = "translateY(0)";
            }, i * 150);
        });
    };
    animateCards(document.querySelectorAll(".highlight-card"));
    animateCards(document.querySelectorAll(".package-card"));
    animateCards(document.querySelectorAll(".card"));
    animateCards(document.querySelectorAll(".depo-card"));
});

const depoCards = document.querySelectorAll(".depo-card");
depoCards.forEach(card => {
    card.addEventListener("click", () => {
        card.style.transform = "scale(1.08)";
        setTimeout(() => {
            card.style.transform = "scale(1)";
        }, 300);
    });
});


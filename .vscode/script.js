function animateCount(id, target, duration) {
    const el = document.getElementById(id);

    if (!el) return;

    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);

        el.textContent = Math.floor(progress * target).toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(tick);
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {

    document.getElementById("stat-rides").textContent = "12,480";
    document.getElementById("stat-drivers").textContent = "186";

} else {

    animateCount("stat-rides", 12480, 1400);
    animateCount("stat-drivers", 186, 1400);

}

window.addEventListener("DOMContentLoaded", () => {

    const path = document.querySelector(".route-art path");
    const car = document.getElementById("car");

    if (!path || !car || prefersReducedMotion) return;

    const length = path.getTotalLength();

    let progress = 0;

    function moveCar() {

        progress += 0.0028;

        if (progress > 1) {
            progress = 0;
        }

        const point = path.getPointAtLength(progress * length);

        const nextPoint = path.getPointAtLength(
            Math.min(progress * length + 1, length)
        );

        const angle =
            Math.atan2(
                nextPoint.y - point.y,
                nextPoint.x - point.x
            ) * 180 / Math.PI;

        car.setAttribute(
            "transform",
            `translate(${point.x},${point.y}) rotate(${angle})`
        );

        requestAnimationFrame(moveCar);
    }

    moveCar();

});


// ===============================
// Mobile Navigation
// ===============================

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {

    toggle.addEventListener("click", () => {

        const isOpen = links.style.display === "flex";

        if (isOpen) {

            links.style.display = "none";

        } else {

            links.style.display = "flex";
            links.style.flexDirection = "column";
            links.style.position = "absolute";
            links.style.top = "76px";
            links.style.left = "0";
            links.style.right = "0";
            links.style.background = "#1B1F27";
            links.style.padding = "20px 32px";
            links.style.gap = "16px";

        }

    });

}
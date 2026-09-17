const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => link.classList.remove("active"));

            const active = document.querySelector(
                `.main-nav a[href="#${entry.target.id}"]`
            );

            if (active) active.classList.add("active");
        });
    },
    { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach(section => observer.observe(section));

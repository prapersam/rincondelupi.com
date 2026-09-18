const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

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


/* =========================================================
   NAVEGACIÓN ACTIVA
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const active = document.querySelector(
                    `.main-nav a[href="#${entry.target.id}"]`
                );

                if (active) {
                    active.classList.add("active");
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => observer.observe(section));
}


/* =========================================================
   HEADER AL HACER SCROLL
   ========================================================= */

const header = document.querySelector(".site-header");

if (header) {
    const updateHeader = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();
}


/* =========================================================
   ANIMACIONES AL HACER SCROLL
   ========================================================= */

const revealElements = document.querySelectorAll(
    "main section, .project-card, .documentation-card, .specialty-card"
);

if (revealElements.length) {
    revealElements.forEach(element => {
        element.classList.add("js-reveal");
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}


/* =========================================================
   BOTÓN VOLVER ARRIBA
   ========================================================= */

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Volver al inicio");
backToTop.innerHTML = "↑";

document.body.appendChild(backToTop);


const updateBackToTop = () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
};

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});


backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


updateBackToTop();


/* =========================================================
   AÑO AUTOMÁTICO
   ========================================================= */

const currentYear = new Date().getFullYear();

document.querySelectorAll("[data-current-year]").forEach(element => {
    element.textContent = currentYear;
});


/* =========================================================
   CERRAR MENÚ AL CAMBIAR A ESCRITORIO
   ========================================================= */

window.addEventListener("resize", () => {
    if (window.innerWidth > 820 && nav) {
        nav.classList.remove("open");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }
    }
});


/* =========================================================
   REDUCIR ANIMACIONES SI EL USUARIO LO PREFIERE
   ========================================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (prefersReducedMotion.matches) {
    document.documentElement.classList.add("reduced-motion");
}

/* =========================================================
   ANIMACIÓN DE ENTRADA
   ========================================================= */

const intro = document.querySelector(".site-intro");

if (intro) {

    setTimeout(() => {
        intro.classList.add("hide");
    }, 1200);

    setTimeout(() => {
        intro.remove();
    }, 2100);

}
// Año automático
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Menú mobile
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// Spotlight verde que sigue al mouse dentro de cards
const spotlightCards = document.querySelectorAll("[data-spotlight]");
spotlightCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  });
});

// Animaciones al entrar al viewport
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach((item) => revealObserver.observe(item));

// Filtro simple de portfolio
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.remove("is-active"));
    button.classList.add("is-active");

    const selected = button.dataset.filter;
    projects.forEach((project) => {
      const show = selected === "all" || project.dataset.category === selected;
      project.classList.toggle("is-hidden", !show);
    });
  });
});
const projectModal = document.getElementById("projectModal");
const projectModalVideo = document.getElementById("projectModalVideo");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDescription = document.getElementById(
  "projectModalDescription",
);
const projectModalClose = document.getElementById("projectModalClose");

const projectButtons = document.querySelectorAll(".open-project");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const video = button.dataset.video;
    const title = button.dataset.title;
    const description = button.dataset.description;

    projectModalVideo.src = video;

    projectModalTitle.textContent = title;
    projectModalDescription.textContent = description;

    projectModal.classList.add("is-open");

    projectModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  });
});

function closeProjectModal() {
  projectModal.classList.remove("is-open");

  projectModal.setAttribute("aria-hidden", "true");

  projectModalVideo.pause();

  projectModalVideo.removeAttribute("src");

  projectModalVideo.load();

  document.body.classList.remove("modal-open");
}

projectModalClose.addEventListener("click", closeProjectModal);

projectModal
  .querySelector(".project-modal-backdrop")
  .addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

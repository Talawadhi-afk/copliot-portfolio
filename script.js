// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Theme toggle (dark/light)
const themeToggle = document.getElementById("themeToggle");

function setTheme(isLight) {
  document.body.classList.toggle("light", isLight);
  themeToggle.textContent = isLight ? "Light mode" : "Dark mode";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "light");

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light");
  setTheme(isLight);
});

// Project filters
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "all" || category === filter;
      card.style.display = show ? "block" : "none";
    });
  });
});

// Modals
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll("[data-close]");

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// Contact form validation (demo)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    statusEl.textContent = "Please enter a valid email address.";
    return;
  }

  statusEl.textContent = "Message sent! (Demo only — no real email is sent.)";
  form.reset();
});
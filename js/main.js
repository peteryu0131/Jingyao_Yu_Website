document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", "#top");
    document.getElementById("top")?.focus({ preventScroll: true });
  });
});

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeColor = document.getElementById("theme-color");

function currentTheme() {
  return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeColor) {
    themeColor.setAttribute("content", theme === "dark" ? "#0c111b" : "#123782");
  }
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  });
  applyTheme(currentTheme());
}

const emailButton = document.querySelector(".contact-copy-email");

if (emailButton) {
  const action = emailButton.querySelector(".contact-action");
  const email = emailButton.dataset.email;
  let resetTimer;

  emailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    emailButton.classList.add("is-copied");
    if (action) action.textContent = "Copied";
    emailButton.setAttribute("aria-label", "Email copied");

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      emailButton.classList.remove("is-copied");
      if (action) action.textContent = "Copy";
      emailButton.setAttribute("aria-label", "Copy email address");
    }, 1800);
  });
}

const revealItems = document.querySelectorAll(
  ".section-heading, .section-intro, .item-disclosure, .edu-card, .certifications, .contact-layout"
);

if (revealItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

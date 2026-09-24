document.getElementById("year").textContent = new Date().getFullYear();

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

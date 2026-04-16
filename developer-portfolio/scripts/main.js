async function loadPartial(container) {
  const path = container.dataset.include;
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load partial: ${path}`);
  }

  container.outerHTML = await response.text();
}

async function loadPartials() {
  const includes = [...document.querySelectorAll("[data-include]")];
  await Promise.all(includes.map(loadPartial));
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) {
        return;
      }

      setTimeout(() => entry.target.classList.add("visible"), index * 60);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  elements.forEach((element) => observer.observe(element));
}

async function init() {
  await loadPartials();
  initRevealAnimations();
}

init().catch((error) => {
  console.error(error);
});

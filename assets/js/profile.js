document.documentElement.classList.add("js");

const status = document.querySelector(".filter-status");

document.querySelectorAll("[data-filter-controls]").forEach((controls) => {
  const listName = controls.dataset.filterControls;
  const list = document.querySelector(`[data-filter-list="${listName}"]`);
  if (!list) return;

  const items = [...list.querySelectorAll("[data-category]")];
  const buttons = [...controls.querySelectorAll("button[data-filter]")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));

      let visibleCount = 0;
      items.forEach((item) => {
        const categories = item.dataset.category.split(" ");
        const visible = filter === "all" || categories.includes(filter);
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (status) status.textContent = `${visibleCount} ${listName} items shown.`;
    });
  });
});

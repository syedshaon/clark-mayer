document.addEventListener("DOMContentLoaded", () => {
  const currentUrl = window.location.pathname.replace(/\/+$/, ""); // remove trailing slash
  const base = window.location.pathname.split("/")[1] || "";

  // Remove current-menu-item from all
  document.querySelectorAll(".menu-item.current-menu-item").forEach((item) => {
    item.classList.remove("current-menu-item");
  });

  // Find all menu links
  const links = document.querySelectorAll(".menu a[href]");

  links.forEach((link) => {
    const linkUrl = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, "");
    if (linkUrl === currentUrl) {
      const li = link.closest("li.menu-item");
      li?.classList.add("current-menu-item");
    }
  });

  // Optional: make Home active on base path
  if (currentUrl === "" || currentUrl === `/${base}`) {
    const homeLink = document.querySelector('.menu-item a[href$="{{ base }}"]')?.closest("li.menu-item");
    homeLink?.classList.add("current-menu-item");
  }
});

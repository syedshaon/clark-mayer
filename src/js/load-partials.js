async function loadPartials() {
  try {
    // Load head
    const headResponse = await fetch("/src/partials/head.html");
    const headHTML = await headResponse.text();
    document.head.insertAdjacentHTML("afterbegin", headHTML);

    // Load header
    const headerResponse = await fetch("/src/partials/header.html");
    const headerHTML = await headerResponse.text();
    document.getElementById("header").innerHTML = headerHTML;

    // Load footer
    const footerResponse = await fetch("/src/partials/footer.html");
    const footerHTML = await footerResponse.text();
    document.getElementById("footer").innerHTML = footerHTML;
  } catch (error) {
    console.error("Error loading partials:", error);
  }
}

loadPartials();

async function loadPartials() {
  // Load header
  const headerResponse = await fetch("/src/partials/header.html");
  const headerHTML = await headerResponse.text();
  document.getElementById("header").innerHTML = headerHTML;

  // Load footer
  const footerResponse = await fetch("/src/partials/footer.html");
  const footerHTML = await footerResponse.text();
  document.getElementById("footer").innerHTML = footerHTML;
}

loadPartials();

function animateTitle() {
  const title = document.getElementById("animated-title");
  const text = "🌐 Welcome to InfoGlobe";
  title.innerHTML = "";

  [...text].forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.className = "letter";
    span.style.animationDelay = `${index * 0.08}s`;
    title.appendChild(span);
  });
}

// Run it initially
animateTitle();

// Loop it every 5 seconds
setInterval(animateTitle, 5000);



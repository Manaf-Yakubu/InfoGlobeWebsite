const form = document.getElementById("search-form");
const input = document.getElementById("country-input");
const infoBox = document.getElementById("country-info");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const country = input.value.trim();
  if (!country) return;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error("Country not found");

    const data = await res.json();
    const c = data[0];

    infoBox.innerHTML = `
      <h2>${c.name.common} (${c.cca2})</h2>
      <p><strong>Capital:</strong> ${c.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> ${c.region}</p>
      <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${Object.values(c.currencies)[0].name} (${Object.values(c.currencies)[0].symbol})</p>
      <p><strong>Languages:</strong> ${Object.values(c.languages).join(", ")}</p>
      <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" width="200" style="margin-top:10px;"/>
    `;
    infoBox.style.display = "block";
    infoBox.classList.add("fade-in");
  } catch (error) {
    infoBox.innerHTML = `<p style="color:red;">${error.message}</p>`;
    infoBox.style.display = "block";
  }
});

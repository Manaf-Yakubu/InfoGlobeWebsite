const form = document.getElementById("cryptoForm");
const input = document.getElementById("cryptoInput");
const resultBox = document.getElementById("cryptoResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const symbol = input.value.trim().toLowerCase();
  if (!symbol) return;

  resultBox.classList.add("hidden");
  resultBox.innerHTML = "Fetching data...";

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol}`);
    const data = await res.json();

    if (!data.length) {
      resultBox.innerHTML = "Crypto not found. Please try another symbol.";
      return;
    }

    const coin = data[0];
    resultBox.innerHTML = `
      <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
      <p>💰 Price: $${coin.current_price.toLocaleString()}</p>
      <p>📈 24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
      <p>📊 Market Cap: $${coin.market_cap.toLocaleString()}</p>
      <p>🔄 Volume (24h): $${coin.total_volume.toLocaleString()}</p>
      <img src="${coin.image}" alt="${coin.name}" width="50" />
    `;
    resultBox.classList.remove("hidden");
  } catch (error) {
    resultBox.innerHTML = "Error fetching crypto data.";
  }
});

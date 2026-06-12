import * as utilities from "./utilities.js";

const loadingEl = document.getElementById("loading");

try {
  await utilities.fetchNeighborhood();
  await utilities.fetchRoute();
  await utilities.fetchStreet();
  await utilities.fetchPlaza();
  await utilities.fetchRecycle();
  await utilities.fetchRecyclePerformByMonth();
} catch (err) {
  loadingEl.textContent = "Failed to load data. Make sure the server is running on port 3000.";
  loadingEl.style.color = "red";
  throw err;
}

loadingEl.style.display = "none";

document.getElementById("monthSelect").addEventListener("change", async () => {
  await utilities.fetchRecyclePerformByMonth();
});

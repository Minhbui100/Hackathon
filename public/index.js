import * as utilities from "./utilities.js";

const neighborhoodTable = document.getElementById("neighborhood_table");
const routeTable = document.getElementById("route_table");
const streetTable = document.getElementById("street_table");
const plazaTable = document.getElementById("plaza_table");
const recycleTable = document.getElementById("recycle_table");
const recyclePerformTable = document.getElementById("recyclePerform_table");

const displayAllTables = function () {
  neighborhoodTable.style.display = "block";
  routeTable.style.display = "block";
  streetTable.style.display = "block";
  plazaTable.style.display = "block";
  recycleTable.style.display = "block";
  recyclePerformTable.style.display = "block";
};

await utilities.fetchNeighborhood();
await utilities.fetchRoute();
await utilities.fetchStreet();
await utilities.fetchPlaza();
await utilities.fetchRecycle();
await utilities.fetchRecyclePerform();
await utilities.fetchRecyclePerformByMonth();
displayAllTables();

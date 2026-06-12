async function fetchNeighborhood() {
  const response = await fetch("http://localhost:3000/neighborhood");
  const data = await response.json();
  const table = document.getElementById("neighborhoodtable");
  table.innerHTML = "";
  data.forEach((neighborhood) => {
    table.innerHTML += `<tr>
      <td>${neighborhood.sncode}</td>
      <td>${neighborhood.neighborhood_name}</td>
    </tr>`;
  });
}

async function fetchRoute() {
  const response = await fetch("http://localhost:3000/route");
  const data = await response.json();
  const table = document.getElementById("routetable");
  table.innerHTML = "";
  data.forEach((route) => {
    table.innerHTML += `<tr>
      <td>${route.routeid}</td>
      <td>${route.sn_code}</td>
      <td>${route.pickup_date}</td>
      <td>${route.truck_id}</td>
    </tr>`;
  });
}

async function fetchStreet() {
  const response = await fetch("http://localhost:3000/street");
  const data = await response.json();
  const table = document.getElementById("streettable");
  table.innerHTML = "";
  data.forEach((street) => {
    table.innerHTML += `<tr>
      <td>${street.streetid}</td>
      <td>${street.streetname}</td>
      <td>${street.routeid}</td>
    </tr>`;
  });
}

async function fetchPlaza() {
  const response = await fetch("http://localhost:3000/plaza");
  const data = await response.json();
  const table = document.getElementById("plazatable");
  table.innerHTML = "";
  data.forEach((plaza) => {
    table.innerHTML += `<tr>
      <td>${plaza.plaza_id}</td>
      <td>${plaza.plaza_name}</td>
      <td>${plaza.streetid}</td>
      <td>${plaza.recycle_rate}</td>
    </tr>`;
  });
}

async function fetchRecycle() {
  const response = await fetch("http://localhost:3000/recycle");
  const data = await response.json();
  const table = document.getElementById("recycletable");
  table.innerHTML = "";
  data.forEach((recycle) => {
    table.innerHTML += `<tr>
      <td>${recycle.recycleid}</td>
      <td>${recycle.plaza_id}</td>
    </tr>`;
  });
}

async function fetchRecyclePerform() {
  const response = await fetch("http://localhost:3000/recyclePerform");
  const data = await response.json();
  const table = document.getElementById("recyclePerformtable");
  table.innerHTML = "";
  data.forEach((rp) => {
    table.innerHTML += `<tr>
      <td>${rp.recycleid}</td>
      <td>${rp.perform_date.slice(0, 10)}</td>
      <td>${rp.volume}</td>
      <td>${rp.pickup === 1 ? "Yes" : "No"}</td>
    </tr>`;
  });
}

async function fetchRecyclePerformByMonth() {
  const monthSelectEl = document.getElementById("monthSelect");
  const month = monthSelectEl ? monthSelectEl.value : "all";

  const response = await fetch(`http://localhost:3000/recyclePerform/${month}`);
  const data = await response.json();

  const table = document.getElementById("recyclePerformtable");
  table.innerHTML = "";
  data.forEach((rp) => {
    table.innerHTML += `<tr>
      <td>${rp.recycleid}</td>
      <td>${rp.perform_date.slice(0, 10)}</td>
      <td>${rp.volume}</td>
      <td>${rp.pickup === 1 ? "Yes" : "No"}</td>
    </tr>`;
  });
}

export {
  fetchNeighborhood,
  fetchRoute,
  fetchStreet,
  fetchPlaza,
  fetchRecycle,
  fetchRecyclePerform,
  fetchRecyclePerformByMonth,
};

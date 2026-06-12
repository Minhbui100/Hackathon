async function fetchNeighborhood() {
  const response = await fetch("http://localhost:3000/neighborhood");
  const bill = await response.json();
  const table = document.getElementById("neighborhoodtable");
  table.innerHTML = "";
  bill.forEach((neighborhood) => {
    const row = `<tr>
            <td>${neighborhood.sncode}</td>
            <td>${neighborhood.neighborhood_name}</td>
            </tr>`;
    table.innerHTML += row;
  });
}

async function fetchRoute() {
  const response = await fetch("http://localhost:3000/route");
  const bill = await response.json();
  const table = document.getElementById("routetable");
  table.innerHTML = "";
  bill.forEach((route) => {
    const row = `<tr>
            <td>${route.routeid}</td>
            <td>${route.sn_code}</td>
            <td>${route.pickup_date}</td>
            <td>${route.truck_id}</td>
            </tr>`;
    table.innerHTML += row;
  });
}

async function fetchStreet() {
  const response = await fetch("http://localhost:3000/street");
  const bill = await response.json();
  const table = document.getElementById("streettable");
  table.innerHTML = "";
  bill.forEach((street) => {
    const row = `<tr>
            <td>${street.streetid}</td>
            <td>${street.streetname}</td>
            <td>${street.routeid}</td>
            </tr>`;
    table.innerHTML += row;
  });
}

async function fetchPlaza() {
  const response = await fetch("http://localhost:3000/plaza");
  const bill = await response.json();
  const table = document.getElementById("plazatable");
  table.innerHTML = "";
  bill.forEach((plaza) => {
    const row = `<tr>
            <td>${plaza.plaza_id}</td>
            <td>${plaza.plaza_name}</td>
            <td>${plaza.streetid}</td>
            <td>${plaza.recycle_rate}</td>
            </tr>`;
    table.innerHTML += row;
  });
}

async function fetchRecycle() {
  const response = await fetch("http://localhost:3000/recycle");
  const bill = await response.json();
  const table = document.getElementById("recycletable");
  table.innerHTML = "";
  bill.forEach((recycle) => {
    const row = `<tr>
            <td>${recycle.recycleid}</td>
            <td>${recycle.plaza_id}</td>
            </tr>`;
    table.innerHTML += row;
  });
}

async function fetchRecyclePerform() {
  const response = await fetch("http://localhost:3000/recyclePerform");
  const bill = await response.json();
  const table = document.getElementById("recyclePerformtable");
  table.innerHTML = "";
  bill.forEach((recyclePerform) => {
    const row = `<tr>
            <td>${recyclePerform.recycleid}</td>
            <td>${recyclePerform.perform_date.slice(0, 10)}</td>
            <td>${recyclePerform.volume}</td>
            <td>${recyclePerform.pickup}</td>
            </tr>`;
    table.innerHTML += row;
  });
}

async function fetchRecyclePerformByMonth() {
  const monthSelectEl = document.getElementById("monthSelect");
  if (!monthSelectEl) return;
  const month = monthSelectEl.value;

  const response = await fetch(`http://localhost:3000/recyclePerform/${month}`);
  const data = await response.json();

  const table = document.getElementById("recyclePerformtable");
  table.innerHTML = "";

  data.forEach((rp) => {
    const row = `
      <tr>
        <td>${rp.recycleid}</td>
        <td>${rp.perform_date.slice(0, 10)}</td>
        <td>${rp.volume}</td>
        <td>${rp.pickup}</td>
      </tr>`;
    table.innerHTML += row;
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

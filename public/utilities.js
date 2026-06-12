// CRUD operations for Students
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
  const month = document.getElementById("monthSelect").value;

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

// load all at start
const monthSelectEl = document.getElementById("monthSelect");
if (monthSelectEl) fetchRecyclePerformByMonth();






async function payment() {
  const orderId = document.getElementById("paymentOrderId").value;
  const customerId = document.getElementById("customerId").value;
  const tip = document.getElementById("tip").value;
  const cardId = document.getElementById("cardId").value;

  try {
    const response = await fetch(`http://localhost:3000/bill/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        tip,
        cardId,
      }),
    });

    if (response.status === 400) {
      // Bill is already paid - get and display the warning message
      const warningMessage = await response.text(); // Read warning message from the response
      displayWarning(warningMessage); // Display warning on the webpage
    } else if (response.ok) {
      // Clear input fields after successful submission
      await fetchBill(); // Refresh the bill data if necessary
      await fetchTransaction();
      await fetchCards();
      await fetchCustomers();
    } else {
      console.error("An error occurred:", response.statusText);
    }
    await fetchBill(); // Refresh the bill data if necessary
    await fetchTransaction();
    await fetchCards();
    await fetchCustomers();
    document.getElementById("paymentOrderId").value = "";
    document.getElementById("customerId").value = "";
    document.getElementById("tip").value = "";
    document.getElementById("cardId").value = "";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Fetch and display enrollments with student ID and enrollment date
async function fetchOrders() {
  const response = await fetch("http://localhost:3000/orders");
  const orders = await response.json();
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";
  orders.forEach((order) => {
    const row = `<tr>
                        <td>${order.id}</td>
                        <td>${order.bill_id}</td>
                        <td>${order.name}</td>
                        <td>${order.price}</td>
                        <td>${order.quantity}</td>
                     </tr>`;
    table.innerHTML += row;
  });
}

async function addOrders() {
  const id = document.getElementById("billNumber").value;
  const name = document.getElementById("orderName").value;
  const price = document.getElementById("orderPrice").value;
  const quantity = document.getElementById("orderQuantity").value;

  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        price,
        quantity,
      }),
    });

    if (response.status === 400) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      // Clear input fields after successful submission

      await fetchOrders();
      await fetchBill();
    } else {
      console.error("An error occurred:", response.statusText);
    }
    document.getElementById("billNumber").value = "";
    document.getElementById("orderName").value = "";
    document.getElementById("orderPrice").value = "";
    document.getElementById("orderQuantity").value = "";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function addCustomer() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;

  try {
    const response = await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
      }),
    });

    if (response.status === 400) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      // Clear input fields after successful submission

      await fetchCustomers();
    } else {
      console.error("An error occurred:", response.statusText);
    }
    document.getElementById("custName").value = "";
    document.getElementById("custPhone").value = "";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function deleteOrders() {
  const id = document.getElementById("orderIdDelete").value;
  const response = await fetch(`http://localhost:3000/orders/${id}`, {
    method: "DELETE",
  });
  if (response.status === 400) {
    // Read and display the warning message from the response
    const warningMessage = await response.text();
    displayWarning(warningMessage);
  } else if (response.ok) {
    // Clear input fields after successful submission
    await fetchOrders();
    await fetchBill();
  } else {
    console.error("An error occurred:", response.statusText);
  }
  document.getElementById("orderIdDelete").value = "";
}

async function deleteCustomer() {
  const id = document.getElementById("custDelete").value;
  const response = await fetch(`http://localhost:3000/customers/${id}`, {
    method: "DELETE",
  });
  if (response.status === 400) {
    // Read and display the warning message from the response
    const warningMessage = await response.text();
    displayWarning(warningMessage);
  } else if (response.ok) {
    // Clear input fields after successful submission
    await fetchCustomers();
  } else {
    console.error("An error occurred:", response.statusText);
  }
  document.getElementById("custDelete").value = "";
}

async function fetchCards() {
  const response = await fetch("http://localhost:3000/cards");
  const cards = await response.json();
  const table = document.getElementById("cardsTable");
  table.innerHTML = "";
  cards.forEach((card) => {
    const row = `<tr>
                        <td>${card.id}</td>
                        <td>${card.name}</td>
                        <td>${card.ex_date}</td>
                        <td>${card.balance}</td>                                
                     </tr>`;
    table.innerHTML += row;
  });
}

async function fetchCustomers() {
  const response = await fetch("http://localhost:3000/customers");
  const customers = await response.json();
  const table = document.getElementById("customersTable");
  table.innerHTML = "";
  customers.forEach((customer) => {
    const row = `<tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.membership_point}</td>                                
                     </tr>`;
    table.innerHTML += row;
  });
}

async function fetchTransaction() {
  const response = await fetch("http://localhost:3000/transaction");
  const transactions = await response.json();
  const table = document.getElementById("transactionTable");
  table.innerHTML = "";
  transactions.forEach((transaction) => {
    const row = `<tr>
                        <td>${
                          transaction.bill_id !== null
                            ? transaction.bill_id
                            : ""
                        }</td>
                        <td>${
                          transaction.total !== null ? transaction.total : ""
                        }</td>
                        <td>${
                          transaction.from_bankacct !== null
                            ? transaction.from_bankacct
                            : ""
                        }</td>
                        <td>${
                          transaction.tdate !== null ? transaction.tdate : ""
                        }</td>
                        <td>${
                          transaction.business_balance
                        }</td>                                
                     </tr>`;
    table.innerHTML += row;
  });
}

// Function to display a warning message on the webpage
function displayWarning(message) {
  let warningDiv = document.getElementById("warning");
  if (!warningDiv) {
    // Create a warning div if it doesn't exist
    warningDiv = document.createElement("div");
    warningDiv.id = "warning";

    // Style the warning box
    warningDiv.style.position = "fixed";
    warningDiv.style.top = "50%";
    warningDiv.style.left = "50%";
    warningDiv.style.transform = "translate(-50%, -50%)"; // Center the box
    warningDiv.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // Red background with some transparency
    warningDiv.style.color = "white"; // White text color for contrast
    warningDiv.style.padding = "20px";
    warningDiv.style.borderRadius = "8px";
    warningDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)"; // Add a subtle shadow
    warningDiv.style.textAlign = "center";
    warningDiv.style.maxWidth = "300px";
    warningDiv.style.zIndex = "1000"; // Ensure it appears on top

    document.body.appendChild(warningDiv);
  }

  // Set the warning message text
  warningDiv.textContent = message;

  // Automatically hide the warning after 3 seconds
  setTimeout(() => {
    warningDiv.remove();
  }, 3000);
}

async function deleteAllCustomers() {
  try {
    const response = await fetch("http://localhost:3000/customers", {
      method: "DELETE",
    });

    if (response.status === 500) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      await fetchCustomers();
    } else {
      console.error("An error occurred:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to delete all customers:", error);
  }
}

async function deleteAllBills() {
  try {
    const response = await fetch("http://localhost:3000/bill", {
      method: "DELETE",
    });

    if (response.status === 500) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      await fetchBill(); // Call function to refresh the list of locations
    } else {
      console.error("Unexpected response:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to delete all bills:", error);
  }
}

async function deleteAllOrders() {
  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "DELETE",
    });

    if (response.status === 500) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      await fetchOrders(); // Call function to refresh the list of locations
    } else {
      console.error("Unexpected response:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to delete all bills:", error);
  }
}

async function deleteAllCards() {
  try {
    const response = await fetch("http://localhost:3000/cards", {
      method: "DELETE",
    });

    if (response.status === 500) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      await fetchCards(); // Call function to refresh the list of locations
    } else {
      console.error("Unexpected response:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to delete all cards:", error);
  }
}

async function deleteAllTransactions() {
  try {
    const response = await fetch("http://localhost:3000/transaction", {
      method: "DELETE",
    });

    if (response.status === 500) {
      // Read and display the warning message from the response
      const warningMessage = await response.text();
      displayWarning(warningMessage);
    } else if (response.ok) {
      await fetchTransaction(); // Call function to refresh the list of locations
    } else {
      console.error("Unexpected response:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to delete all transaction:", error);
  }
}

export {
  fetchNeighborhood,
  fetchRoute,
  fetchStreet,
  fetchPlaza,
  fetchRecycle,
  fetchRecyclePerform,
  fetchRecyclePerformByMonth,


  payment,
  fetchOrders,
  addOrders,
  addCustomer,
  deleteOrders,
  deleteCustomer,
  fetchCards,
  fetchCustomers,
  fetchTransaction,
  displayWarning,
  deleteAllCustomers,
  deleteAllBills,
  deleteAllOrders,
  deleteAllCards,
  deleteAllTransactions,
};

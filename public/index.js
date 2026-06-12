import * as utilities from "./utilities.js";

const neighborhoodTable = document.getElementById("neighborhood_table");
const routeTable = document.getElementById("route_table");
const streetTable = document.getElementById("street_table");
const plazaTable = document.getElementById("plaza_table");
const recycleTable = document.getElementById("recycle_table");
const recyclePerformTable = document.getElementById("recyclePerform_table");


const orderTable = document.getElementById("order_table");
const cardTable = document.getElementById("card_table");
const customerTable = document.getElementById("customer_table");
const transactionTable = document.getElementById("transaction_table");
const createTableBtn = document.querySelector(".createTable");
const addOrderBtn = document.getElementById("addOrder");
const deleteOrderBtn = document.getElementById("deleteOrder");
const paymentBtn = document.getElementById("payment");
const addCustomerBtn = document.getElementById("addCustomer");
const deleteCustomerBtn = document.getElementById("deleteCustomer");
const deleteAllBillsBtn = document.getElementById("deleteAllBills");
const deleteAllOrdersBtn = document.getElementById("deleteAllOrders");
const deleteAllCardsBtn = document.getElementById("deleteAllCards");
const deleteAllCustomersBtn = document.getElementById("deleteAllCustomers");
const deleteAllTransactionsBtn = document.getElementById(
  "deleteAllTransactions"
);

const neighborhoodTableSql = `
\c postgres
DROP DATABASE recycle;
CREATE DATABASE recycle;
\c recycle

CREATE TABLE neighborhood (
    sncode VARCHAR(10) PRIMARY KEY,
    neighborhood_name VARCHAR(100) NOT NULL
);

INSERT INTO neighborhood (sncode, neighborhood_name)
VALUES
('51', 'Downtown'),
('56', 'Midtown'),
('55', 'Museum District'),
('5',  'Second Ward'),
('61', 'EaDo - East Downtown');

`;

const routeTableSql = `
CREATE TABLE route (
    routeID SERIAL PRIMARY KEY,
    sn_code VARCHAR(10) REFERENCES neighborhood(sncode),
    pickup_date VARCHAR(10) NOT NULL CHECK (pickup_date IN ('Monday','Tuesday','Wednesday','Thursday','Friday')),
    truck_id VARCHAR(20) NOT NULL
);

INSERT INTO route (sn_code, pickup_date, truck_id)
VALUES
('51', 'Monday', 'Truck-A'),
('51', 'Tuesday', 'Truck-B'),
('51', 'Wednesday', 'Truck-A'),
('51', 'Thursday', 'Truck-B'),
('51', 'Friday', 'Truck-A');

INSERT INTO route (sn_code, pickup_date, truck_id)
VALUES
('56', 'Monday', 'Truck-C'),
('56', 'Tuesday', 'Truck-D'),
('56', 'Wednesday', 'Truck-C'),
('56', 'Thursday', 'Truck-D'),
('56', 'Friday', 'Truck-D');

INSERT INTO route (sn_code, pickup_date, truck_id)
VALUES
('55', 'Monday', 'Truck-E'),
('55', 'Tuesday', 'Truck-F'),
('55', 'Wednesday', 'Truck-F'),
('55', 'Thursday', 'Truck-E'),
('55', 'Friday', 'Truck-F');

INSERT INTO route (sn_code, pickup_date, truck_id)
VALUES
('5', 'Monday', 'Truck-G'),
('5', 'Tuesday', 'Truck-H'),
('5', 'Wednesday', 'Truck-H'),
('5', 'Thursday', 'Truck-G'),
('5', 'Friday', 'Truck-H');

INSERT INTO route (sn_code, pickup_date, truck_id)
VALUES
('61', 'Monday', 'Truck-I'),
('61', 'Tuesday', 'Truck-K'),
('61', 'Wednesday', 'Truck-I'),
('61', 'Thursday', 'Truck-I'),
('61', 'Friday', 'Truck-K');
`;


const streetTableSql = `
-- 1. Create street table
CREATE TABLE street (
    streetid SERIAL PRIMARY KEY,
    streetname VARCHAR(100) NOT NULL,
    routeid INT REFERENCES route(routeid)
);

-- 2. Insert streets for ALL 25 route zones

INSERT INTO street (streetname, routeid) VALUES
-- SN 51 — Downtown (Routes 1–5)
('Main St', 1), ('Travis St', 1), ('Louisiana St', 1),
('Smith St', 2), ('Milam St', 2), ('San Jacinto St', 2),
('Austin St', 3), ('Caroline St', 3), ('Dallas St', 3),
('Fannin St', 4), ('Walker St', 4), ('McKinney St', 4),
('Bell St', 5), ('Clay St', 5), ('Lamar St', 5),

-- SN 56 — Midtown (Routes 6–10)
('Bagby St', 6), ('Brazos St', 6), ('Elgin St', 6),
('Holman St', 7), ('La Branch St', 7), ('Dennis St', 7),
('Almeda Rd', 8), ('San Jacinto St', 8), ('Hadley St', 8),
('Tuam St', 9), ('McGowen St', 9), ('Fannin St', 9),
('Austin St', 10), ('Caroline St', 10), ('Gray St', 10),

-- SN 55 — Museum District (Routes 11–15)
('Binz St', 11), ('La Branch St', 11), ('Southmore Blvd', 11),
('Calumet St', 12), ('Hermann Dr', 12), ('Jackson St', 12),
('Wheeler Ave', 13), ('Almeda Rd', 13), ('Blodgett St', 13),
('Caroline St', 14), ('San Jacinto St', 14), ('Prospect St', 14),
('Wentworth St', 15), ('Bolsover St', 15), ('Rosedale St', 15),

-- SN 5 — Second Ward (Routes 16–20)
('Canal St', 16), ('Navigation Blvd', 16), ('N Delmar St', 16),
('Jensen Dr', 17), ('N Palmer St', 17), ('Evergreen Dr', 17),
('York St', 18), ('Sampson St', 18), ('Garland St', 18),
('N Milby St', 19), ('N Edgewood St', 19), ('Engelke St', 19),
('Lockwood Dr', 20), ('N Velasco St', 20), ('Canal St', 20),

-- SN 61 — East Downtown (Routes 21–25)
('Polk St', 21), ('Hutchins St', 21), ('St Emanuel St', 21),
('Dallas St', 22), ('Bell St', 22), ('Clay St', 22),
('Rusk St', 23), ('Walker St', 23), ('McKinney St', 23),
('Leeland St', 24), ('Texas Ave', 24), ('Dowling St', 24),
('Harrisburg Blvd', 25), ('York St', 25), ('Sampson St', 25);

`;


const plazaTableSql = `
CREATE TABLE plaza (
    plaza_id SERIAL PRIMARY KEY,
    plaza_name VARCHAR(100) NOT NULL,
    streetid INT REFERENCES street(streetid),
    recycle_rate NUMERIC(3,2)
);
INSERT INTO plaza (plaza_name, streetid, recycle_rate)
SELECT
    street.streetname || ' Plaza ' || n AS plaza_name,
    street.streetid,
    ROUND( (0.3 + RANDOM() * 0.3)::numeric, 1 ) AS recycle_rate
FROM street
CROSS JOIN generate_series(1, 10) AS n;

`;

const recycleTableSql = `
CREATE TABLE recycle (
    recycleID SERIAL PRIMARY KEY,
    plaza_id INT REFERENCES plaza(plaza_id)
);
INSERT INTO recycle (plaza_id)
SELECT plaza_id
FROM plaza
-- Generate 1 bin for every plaza
UNION ALL
SELECT plaza_id
FROM plaza
WHERE RANDOM() < 0.2;  -- 20% chance to generate a second bin
`;

const recyclePerformTableSql = `
CREATE TABLE recyclePerform (
    recycleid INT REFERENCES recycle(recycleid),
    perform_date DATE,
    volume NUMERIC(3,2),
    pickup INT,
    PRIMARY KEY (recycleid, perform_date)
);
INSERT INTO recyclePerform (recycleid, perform_date, volume, pickup)
SELECT
    recycleid,
    saturday,
    volume,
    CASE WHEN volume <= 0.3 THEN 0 ELSE 1 END AS pickup
FROM (
    SELECT
        r.recycleid,
        d.saturday,
        ROUND((0.1 + RANDOM() * 0.9)::numeric, 2) AS volume
    FROM recycle r
    CROSS JOIN (
        SELECT generate_series('2025-10-04'::date, '2025-11-29'::date, '1 week') AS saturday
    ) AS d
) AS sub;
`;



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


async function createTable(sql) {
  try {
    const response = await fetch("http://localhost:3000/createtable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }), // Ensure the body is correctly formatted
    });

    if (!response.ok) {
      // Check for error response status
      console.error("Server error:", response.status, response.statusText);
      const errorResponse = await response.json(); // Parse the error body
      console.error("Error details:", errorResponse.error);
      utilities.displayWarning(errorResponse.error);
      return;
    }

    const result = await response.json(); // Parse the response as JSON
    console.log("Table creation result:", result);
  } catch (error) {
    console.error("Error creating table:", error); // Catch any network or parsing errors
  }
}

await createTable(neighborhoodTableSql);
await utilities.fetchNeighborhood();

await createTable(routeTableSql);
await utilities.fetchRoute();

await createTable(streetTableSql);
await utilities.fetchStreet();

await createTable(plazaTableSql);
await utilities.fetchPlaza();

await createTable(recycleTableSql);
await utilities.fetchRecycle();

await createTable(recyclePerformTableSql);
await utilities.fetchRecyclePerform();

displayAllTables();


window.onload = async function () {
  await utilities.fetchNeighborhood();
  await utilities.fetchRoute();
  await utilities.fetchStreet();
  await utilities.fetchPlaza();
  await utilities.fetchRecycle();
  await utilities.fetchRecyclePerform();
  await utilities.fetchRecyclePerformByMonth();

  displayAllTables();
};


addOrderBtn.addEventListener("click", async () => {
  await utilities.addOrders();
});
deleteOrderBtn.addEventListener("click", async () => {
  await utilities.deleteOrders();
});
paymentBtn.addEventListener("click", async () => {
  await utilities.payment();
});
addCustomerBtn.addEventListener("click", async () => {
  await utilities.addCustomer();
});
deleteCustomerBtn.addEventListener("click", async () => {
  await utilities.deleteCustomer();
});

deleteAllBillsBtn.addEventListener("click", async () => {
  await utilities.deleteAllBills();
  await utilities.fetchBill();
});
deleteAllOrdersBtn.addEventListener("click", async () => {
  await utilities.deleteAllOrders();
  await utilities.fetchOrders();
});
deleteAllCardsBtn.addEventListener("click", async () => {
  await utilities.deleteAllCards();
  await utilities.fetchCards();
});
deleteAllCustomersBtn.addEventListener("click", async () => {
  await utilities.deleteAllCustomers();
  await utilities.fetchCustomers();
});
deleteAllTransactionsBtn.addEventListener("click", async () => {
  await utilities.deleteAllTransactions();
  await utilities.fetchTransaction();
});

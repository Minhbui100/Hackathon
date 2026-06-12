HOW TO RUN OUR PROGRAM

Step 1: Install dependencies
Run the following command in Command Prompt (not PowerShell):

    npm install

Step 2: Create the database
In PostgreSQL, run:

    CREATE DATABASE recycle;

Then run the SQL schema file to create and populate all tables:

    psql -U postgres -f Untitled-1.sql

Step 3: Configure database credentials
Edit config.json with your PostgreSQL details:

    {
      "user": "your_db_user",
      "password": "your_db_password",
      "port": 5432
    }

Step 4: Start the server
In your terminal, run:

    node server.js

Step 5: Open the app
Open your browser and go to:

    http://localhost:3000

---

FEATURES
- View Super Neighborhoods, Route Zones, Streets, Plazas, and Recycling Bins
- View Recycling Pickup Records, filterable by month

HOW TO RUN OUR PROGRAM
Step 1: Install dependencies:
npm install express pg body-parser cors

Step 2: Create database named "recycle" in your localhost by using this command
"CREATE DATABASE recycle;"

Step 3 : in config.json file, input your database user, password and port in this following format
{
"user": "",
"password": "",
"port":
}

step 4: in your terminal, run "node server.js" to run back end server side

step 5: open another terminal, run "node app.js" to run front end HTML

step 6: Make sure both node server.js (port 3000) and node app.js (port 8000) are running, then open http://localhost:8000
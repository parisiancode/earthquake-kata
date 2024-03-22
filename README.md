# earthquake-kata
Get earthquakes data from open source API

When server starts, an initial download is done from 2024-03-08 to today's date, then it is possible to add items from a specific date (See below)
For saving time purpose, it was decided to save the data in a local file and each time the server starts, it is reset.
We also do not check id unicity when adding new items from a specific day neither date input format.

[Design API guidelines](/design)

## Project configuration
`NodeJs 20.11.1`<br/>
`npm 10.5.0`<br/>
`TypeScript 5.4.2`

## Quick Start
Install Express Server and DotEnv depedencies
> `npm i express dotenv`

Dotenv is used to read environment variables from the .env file (Not ignored for this first version)

If not already done (check tsc -v), install TypeScript
> `npm install -g typescript`

Build the project
> `npm run build`

Start the project
> `npm run start`

Once started, you should retrieve this message in your console log 
> Server Up and Running. Listen on port 3000

Access through http://localhost:3000/

## DataStorage
It has been decided on this first version to save earthquake item to a local file named ``earthquakes.json`` from `.env` properties.

## How to add items from a specific day
<URL_Path>/add?day=<YYYY-MM-DD>
Example : http://localhost:3000/add?day=2024-03-22

## 404 Not Found
> [!NOTE]
Only "/" and "/add" are allowed, otherwise, a 404 Not Found error will be display

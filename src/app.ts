import express from "express";
import dotenv from "dotenv";

// Import datasource function
import {addEarthquakesFromADay, init} from "./load_datasource";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  try {
      res.status(200).send("<h1>It works !!!</h1><p>Server is up and running</p>");
  } catch (error) {
      throw new Error('Initialization failed');
  }
});

// Query ?day=<Format YYYY-MM-DD>
app.get('/add', (req, res) => {
    try {
        const queryByDay: string = req.query.day?.toString() ?? "";
        addEarthquakesFromADay(queryByDay);
        res.status(200).send("<h1>New items added</h1><p>Query used : " + req.originalUrl + "</p>");
    } catch (error) {
        throw new Error('Adding a new day failed');
    }
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>Error 404: Resource not found</h1>");
});

app.listen(PORT, () => { 
  console.log("Server Up and Running. Listen on port ", PORT); 
  init();
}).on("error", (error) => {
  throw new Error(error.message);
});
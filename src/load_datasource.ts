import dotenv from "dotenv";
const fs = require('fs')

dotenv.config();
const db_storage = process.env.datasource_file_name;

// Date from specification
const starting_date = '2024-03-08';
// From documenation, Endtime argument is by default today's date
let query = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=';

type Earthquake = {
    id: string;
    day: string;
    stateOrCountry: string;
}

export function init() {
    fetchQueries(query + starting_date, true);
}

/**
 * Get all earthquakes from a defined date
 * @param dateToQuery add?day=2024-03-21
 */
export function addEarthquakesFromADay(dateToQuery: string) {
    fetchQueries(query + dateToQuery, false);
}

/**
 * Initialize the data
 * @returns Inserted item number
 */
async function fetchQueries(queryToFetch: string, isInit: boolean): Promise<any> {
    fetch(queryToFetch)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('API request failed');
                }
            })
            .then(data => {
                console.log("Stored item processed from external query : " + data.features.length);
                if (isInit) {
                    generateDatasource(addFetchItems(data));
                } else {
                    const myJson = JSON.parse(fs.readFileSync(db_storage));
                    const myList = addFetchItems(data);
                    for (const item in myList) {
                        myJson.push(item);
                    }
                    generateDatasource(myJson);
                }
            })
            .catch(error => {
                console.error(error);
            });
}

function addFetchItems(data: any): Array<Earthquake> {
    let earthquakeArray: Array<Earthquake> = [];
    for(let item of data.features) {
        // Avoid undefined place issue
        let location: string = item.properties.place ?? ",";
        const myEQ: Earthquake = {
            id: item.id,
            day: new Date(item.properties.time).toISOString().substring(0, 10),
            stateOrCountry: location.substring(location.lastIndexOf(",") + 1).trim(),
        };
        earthquakeArray.push(myEQ);
    }
    return earthquakeArray;
}

/**
 * Save gathered result in JSON format
 * @param earthquakeArray Earthquake array to be insert in JSON format
 */
function generateDatasource(earthquakeArray: Array<Earthquake>) {
    try {
        fs.writeFileSync(db_storage, JSON.stringify(earthquakeArray));
        console.log("Total earthquake items inserted : "+ earthquakeArray.length);
    } catch (error) {
        console.error(error);
    }
}
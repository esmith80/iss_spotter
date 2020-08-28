/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, all's well and we got the data
    callback(null, JSON.parse(body).ip);
      
  });
};
// this will return lat and long for an ip address
const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, all's well and we got the data
    
    const data = { latitude: Number(JSON.parse(body).data.latitude), longitude: Number(JSON.parse(body).data.longitude) };
    callback(null, data);
  });
  
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = JSON.stringify(coords.latitude);
  const lon = JSON.stringify(coords.longitude);
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`, (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, all's well and we got the data    
    const riseTimes = JSON.parse(body).response;
    callback(null, riseTimes);

  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = (nextIssTimesCB) => {
  // fetch my IP
  fetchMyIP( (error, ip) => {
    if (error) {
      nextIssTimesCB(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, latLong) => {
      if (error) {
        nextIssTimesCB(error, null);
        return;
      }
      fetchISSFlyOverTimes(latLong, (error, issFlyTimes) => {
        if (error) {
          nextIssTimesCB(error, null);
          return;
        }
        nextIssTimesCB(null, issFlyTimes);
      })
    })
  });
  // fetch my coordinates
  // fetch long lat for ISS
  // 
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };





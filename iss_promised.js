const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (ipObject) => {
  const ip = JSON.parse(ipObject).ip;
  return request(`https://ipvigilante.com/${ip}`);
};
// returns the flyOverTimes Object
const fetchISSFlyOverTimes = (coordsObj) => {
  const { latitude, longitude } = JSON.parse(coordsObj).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data); // why do i need to pass in data here when i know it's returned?
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };
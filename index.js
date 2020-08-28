const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  // we should have the data by now
  fetchCoordsByIP(ip, (error, data) => {
  // print out error and data for fetch
  console.log(error);
  console.log(data);
  
    fetchISSFlyOverTimes(data, (error, data) => {
      // print out the riseimes- duration object 
     console.log(error);
     console.log(data); 
    }); 
  });
});
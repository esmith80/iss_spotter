const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
/*
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
*/

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let i = 0; i < passTimes.length; i++) {
    const localTime = new Date(0);
    localTime.setUTCSeconds(passTimes[i].risetime);
    const duration = passTimes[i].duration;
    console.log(`Next pass at ${localTime} for ${duration} seconds!`);
  }
});

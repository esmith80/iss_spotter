const { nextISSTimesForMyLocation } = require('./iss_promised.js');

nextISSTimesForMyLocation()
 .then(passTimes => {
        for (let i = 0; i < passTimes.length; i++) {
        const localTime = new Date(0);
        localTime.setUTCSeconds(passTimes[i].risetime);
        const duration = passTimes[i].duration;
        console.log(`Next pass at ${localTime} for ${duration} seconds!`);
        }
      }).catch((error) => {
        console.log("It didn't work: ", error.message);
      });
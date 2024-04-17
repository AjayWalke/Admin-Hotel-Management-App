import React from 'react'

const Check = (hours, roomPrice) => {
  if(hours > 48) {
    return roomPrice;
  }
  else if(hours >= 24 && hours <= 48) {
    return roomPrice*0.5;
  }
  else {
    return 0;
  }
}

export default Check

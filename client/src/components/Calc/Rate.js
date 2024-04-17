import React from 'react';
import roomData from '../roomData';

const Rate = (roomType) => {
  const price = roomData.find((room) => room.Type == roomType);
  return price.Price;
}

export default Rate

import React from "react";

function tt(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    const formattedDate = `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
    return formattedDate;
  }
  
  function conv(time12Hr) {
    const [time, meridian] = time12Hr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    if (meridian === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridian === "AM" && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  }
  const Calculations = (temp1, temp2, operation) => {
    let ans = 0;
    // console.log(temp1, temp2, operation);
    if (operation == "create" || operation == "edit") {
      let [d1, t1] = temp1.split(' ');
      let [d2, t2] = temp2.split(' ');
      let a = conv(t1);
      let b = conv(t2);
      let c = new Date(d1);
      let d = new Date(d2);
      let temp = (d-c)/(1000*60);
      ans = (temp + b - a)/60;
      // console.log(a, b, c, d, temp, ans);
    } else {
        let temp2 = new Date();
        temp2 = tt(temp2);
        // console.log(temp2);
        return Calculations(temp2, temp1, "create");
    }
    return ans;
  };

export default Calculations;

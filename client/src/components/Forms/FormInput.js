import React, { useEffect, useState } from "react";
import Input from "./Input";
import API from "../../services/API";
import Calculations from "../Calc/Calculations";
import Rate from "../Calc/Rate";
import Check from "../Calc/Check";
import Reusable from "./Reusable";

const FormInput = () => {
  const [operation, setOperation] = useState("");
  const [count, setData] = useState();
  const [refNo, setRefNo] = useState();
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const getrefNo = async () => {
    const { data } = await API.get("/counter/get-counter");
    console.log(data);
    if (data?.success) {
      // console.log(data.counter.count);
      setData(data?.counter.count);
    }
  };
  useEffect(() => {
    getrefNo();
  });

  const handleSubmit = async () => {
    try {
      if (operation === "create") {
        // console.log(operation,refNo,email,startDate,endDate,roomType,roomNumber);
        const temp1 = startDate + " " + startTime;
        const temp2 = endDate + " " + endTime;
        // console.log(temp1, temp2);
        const roomPrice = Calculations(temp1, temp2, "create") * Rate(roomType);
        // console.log(Rate(roomType));
        const confirmation = window.confirm(`Are you want to continue Pay Rs. ${roomPrice}`);
        if (confirmation) {
          const { data } = await API.post("/user/create-user", {refNo: count,email,startDate: temp1,endDate: temp2,roomType,roomNumber,roomPrice});
          if (data?.success) {
            alert(data?.message);
          } else {
            alert(data?.message);
          }
        }
      } else if (operation === "edit") {
        const temp1 = startDate + " " + startTime;
        const temp2 = endDate + " " + endTime;
        const roomPrice = Calculations(temp1, temp2, "edit") * Rate(roomType);
        // calculate the new prices
        // console.log(operation,refNo,email,startDate,endDate,roomType,roomNumber);
        const confirmation = window.confirm(`New Price : Rs ${roomPrice}`);
        if (confirmation) {
          const {data} = await API.post("/user/edit-user", {refNo,email,startDate,endDate,roomType,roomNumber,roomPrice});
          alert(data?.message);
        }
      } else if (operation === "delete") {
        const { data } = await API.get("/user/get-user", {params: { refNo: refNo }});
        // console.log(data);
        if (data?.success) {
          const temp1 = data?.user.startDate;
          const temp2 = data?.user.endDate;
          // console.log(temp1, temp2);
          const temp = Calculations(temp1, temp2, "delete");
          // console.log(temp);
          const roomPrice = Check(temp,data?.user.roomPrice);
          // calculate the cancellation charges
          // console.log(operation,refNo,email,startDate,endDate,roomType,roomNumber);
          const confirmation = window.confirm(`Warning! Paided amount : ${data?.user.roomPrice}, Refund : ${roomPrice}`);
          if (confirmation) {
            await API.post("/user/delete-user", {refNo,email,startDate,endDate,roomType,roomNumber,roomPrice});
            alert('deleted Successfully');
          }
        } else {
          alert(data?.message);
        }
      }
      window.location.reload();
    } catch (error) {
      // console.log(error);
      alert(error);
    }
  };

  return (
    <div className="booking">
      {/* we will have 3 three radion buttons and submit buttion along with all input data */}
      <form>
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="operation"
              id="book"
              value={"create"}
              onChange={(e) => setOperation(e.target.value)}
            />
            <label htmlFor="book" className="form-check-label">
              Create
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="operation"
              id="edit"
              value={"edit"}
              onChange={(e) => setOperation(e.target.value)}
            />
            <label htmlFor="edit" className="form-check-label">
              Edit
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="operation"
              id="delete"
              value={"delete"}
              onChange={(e) => setOperation(e.target.value)}
            />
            <label htmlFor="delete" className="form-check-label">
              Delete
            </label>
          </div>
        </div>

        {operation === "create" && (
          <>
            <Input
              labelFor="forRefNo"
              labelText={"RefNo"}
              name={"refNo"}
              inputType={"RefNo"}
              value={count}
            />
            <Input
              labelFor="forEmail"
              labelText={"Email"}
              name={"email"}
              inputType={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              labelFor="forStartDate"
              labelText={"StartDate"}
              name={"startDate"}
              inputType={"date"}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              labelFor="forStartTime"
              labelText={"StartTime"}
              name={"startTime"}
              inputType={"time"}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              labelFor="forEndDate"
              labelText={"EndDate"}
              name={"endDate"}
              inputType={"date"}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Input
              labelFor="forEndTime"
              labelText={"EndTime"}
              name={"endTime"}
              inputType={"time"}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <Input
              labelFor="forRoomType"
              labelText={"RoomType"}
              name={"roomType"}
              inputType={"string"}
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <Input
              labelFor="forRoomNumber"
              labelText={"RoomNumber"}
              name={"roomNumber"}
              inputType={"number"}
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </>
        )}
        {operation === "edit" && (
          <>
            <Input
              labelFor="forRefNo"
              labelText={"RefNo"}
              name={"refNo"}
              inputType={"RefNo"}
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
            />
            <Input
              labelFor="forEmail"
              labelText={"Email"}
              name={"email"}
              inputType={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              labelFor="forStartDate"
              labelText={"StartDate"}
              name={"startDate"}
              inputType={"date"}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              labelFor="forStartTime"
              labelText={"StartTime"}
              name={"startTime"}
              inputType={"time"}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              labelFor="forEndDate"
              labelText={"EndDate"}
              name={"endDate"}
              inputType={"date"}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Input
              labelFor="forEndTime"
              labelText={"EndTime"}
              name={"endTime"}
              inputType={"time"}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <Input
              labelFor="forRoomType"
              labelText={"RoomType"}
              name={"roomType"}
              inputType={"string"}
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <Input
              labelFor="forRoomNumber"
              labelText={"RoomNumber"}
              name={"roomNumber"}
              inputType={"number"}
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </>
        )}
        {operation === "delete" && (
          <Input
            labelFor="forRefNo"
            labelText={"RefNo"}
            name={"refNo"}
            inputType={"RefNo"}
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
          />
        )}
      </form>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormInput;

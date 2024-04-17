import React, { useState } from "react";
import API from "../../services/API";
import Input from "../Forms/Input";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap"; 
import {ReactTableScroll} from "react-table-scroll";
import "../../styles/styles.css";

const Search = () => {
  const [roomType, setRoomType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [data, setData] = useState([]);

  const searchall = async () => {
    try {
      const { data } = await API.get("/view/search-all");
      if (data.success) {
        // console.log(data?.user);
        setData(data?.user);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  const search = async () => {
    try {
      console.log(roomType, roomNumber, startDate, endDate);
      if ((roomType && roomNumber) || (startDate && endDate)) {
        if (roomType && roomNumber) {
          const {data}  = await API.get("/view/room-no", {params:{roomType:roomType,roomNumber:roomNumber}});
          setData(data?.user);
        } else {
          const {data} = await API.get("/view/start-end-date", {params:{startDate:startDate,endDate:endDate}});
          console.log(data.user);
          setData(data?.user);
        }
      } else {
        alert("Provide the details");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <hr></hr>
      <form>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Input
            labelFor="forStartDate"
            labelText={"StartDate"}
            name={"startDate"}
            inputType={"date"}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            inputType={"string"}
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
      </form>
      <div style={{display: 'flex', gap: "10px"}}>
        <button type="submit" onClick={searchall}>SearchAll</button>
        <button type="submit" onClick={search}>Search</button>
      </div>
      <hr></hr>
      <Container fluid className="p-2">
        <ReactTableScroll>
          <table class="table ms-3">
            <thead>
              <tr>
                <th scope="col">refNo</th>
                <th scope="col">Email</th>
                <th scope="col">Start&nbsp;Date</th>
                <th scope="col">End&nbsp;Date</th>
                <th scope="col">Room&nbsp;Type</th>
                <th scope="col">Room&nbsp;Number</th>
                <th scope="col">Room&nbsp;Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tt) => (
                <tr key={tt._id}>
                  <td>{tt.refNo}</td>
                  <td>{tt.email}</td>
                  <td>{tt.startDate}</td>
                  <td>{tt.endDate}</td>
                  <td>{tt.roomType}</td>
                  <td>{tt.roomNumber}</td>
                  <td>{tt.roomPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReactTableScroll>
      </Container>

    </div>
  );
};

export default Search;

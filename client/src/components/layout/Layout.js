import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../../styles/styles.css'
import Search from "./Search";

const Layout = () => {
  return (
    <>

      <div className="header">
        <Header/>
      </div>

      <div className="row g-0">
        <div className="col-md-4">
          <Sidebar/>
        </div>
        
        <div className="col-md-6">

            <h3>View Bookings</h3>
            <Search/>            

        </div>

      </div>

    </>
  );
};

export default Layout;

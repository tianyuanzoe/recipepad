import Home from "./home";

import Search from "./search";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function Project() {

  return (
    <div className="container-fluid bg-color-red">
      <h1>Project</h1>
      <div className="row">
        <div className="col-2">
          <div className="list-group">
            <Link to="/project/" className="list-group-item">
              Home
            </Link>
            
            <Link to="/project/search" className="list-group-item">
              Search
            </Link>
            
            {/* <Link to="/project/details" className="list-group-item">
              Details
            </Link> */}
          </div>
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:search" element={<Search />} />
            {/* <Route path="/details/:idMeal" element={<Details />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Project;
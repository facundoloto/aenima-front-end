import React from "react";
import { Hearts } from "react-loader-spinner";
import "./loader.css";

export default function Loader(){
  return(
   <div>
    <div className="loader">
    <Hearts ariaLabel="loading-indicator" color="#ff8c00" width={"200px"}/>
    </div>
   </div>
  );
}

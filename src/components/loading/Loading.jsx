import React, { useEffect, useState } from "react";
import "./loading.scss"

export default function Loading(small) {
  
  if(small.small){
  
    return(<div className="smallLoadingContainer loadingContainer">
      <p>Loading</p>
      <div><span></span></div>
      
    </div>)
  }else {
    return(
      <div className="loadingContainer">
        <p>Loading</p>
        <div><span></span></div>
        
      </div>
    )
  }

}
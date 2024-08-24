import React from "react"
import "./SearchBar.scss"
export default function SearchBar() {


  return(
    <form className="searchBar" onSubmit="event.preventDefault();" role="search">
      <label className="labelSearch" htmlFor="search">Search for stuff</label>
      <input className="inputSeach" id="search" type="search" placeholder="Search..." autoFocus required />
      <button className="searchButton" type="submit">Go</button>    
    </form>

   
  )
}



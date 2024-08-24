import React from "react";
import "./myprofilecomponent.scss"
import {ReactComponent as PenSvg} from "../../Assests/svgs/pen.svg"

export default function MyProfileComponent(
  {
    profilePic, 
    UserName, 
    UserTag,
    Followers,
    Following

  }) {

  return(
    <>
    <div className="profileContainer">
      <div>

        <div className="purpleBar">
        </div>

        <div className="whiteBox">

          <div className="backgroundBanner"></div>

          <div className="mainRowContainer">

            <img className="myProfilePic" src={profilePic}></img>
 
            <div className="profileTextContainer">
              <h3>{UserName}</h3>
              <h4>{UserTag}</h4>
              <p> <span>{Followers}</span> Followers  <span>{Following}</span> Following</p>
            </div>

            <div className="editContainer">
              <PenSvg/>
              <p>Edit Profile</p>
            </div>

          </div>


          <div className="aboutText">
            <p>A developer developing stuff, primarialy stupid discord meme bots XD</p>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
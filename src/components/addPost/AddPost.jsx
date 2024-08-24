import React, { useEffect, useRef, useState } from "react";
import "./addpost.scss"
import {ReactComponent as AddPostSvg} from "../../Assests/svgs/addPost.svg"

export default function AddPost(
  {
  username,
  userID,
  avatar
  }
){

  const [openPopup, setOpenPopup] = useState(false)
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "pxgd";
    }
  }, [value]);

  const handleChange = (evt) => {
    const val = evt.target.value;
    setValue(val);
  };

  if(openPopup){
    return(
    <>
    <div className="popUpContainer">
      <div className="purpleFormBar"></div>

      <div className="addPostFormContainer">
        <form className="addPostForm">
          
          {/* <p>Post</p> */}
          <div className="firstRow">
            <img className="profilePic" src={`https://y-socials.pockethost.io/api/files/users/${userID}/${avatar}`} />
            <div className="firstRowText">
              <h3>{username}</h3>
              <label htmlFor=""/>
              <textarea className="postContent" type="text" name="postText" autoComplete="off" rows="1" onChange={handleChange}
              />
            </div>
          </div>

          <label htmlFor=""/>
          <input type="file" autoComplete="off"/>


        </form>
      </div>
    </div>
    </>
    )
  }else {return(
<div className="addPostContainer" onClick={() => setOpenPopup(!openPopup)}>    
  <AddPostSvg />
    </div>
  )}
}

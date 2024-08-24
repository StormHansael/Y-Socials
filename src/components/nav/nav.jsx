import React from "react";
import { useNavigate } from 'react-router-dom';
import "./nav.scss";
import { ReactComponent as LookingGlassSVG } from "../../Assests/svgs/lookingGlass.svg";
import { ReactComponent as Bell } from "../../Assests/svgs/bell.svg"
import { ReactComponent as ChatBauble } from "../../Assests/svgs/squareChatBauble.svg"
import { ReactComponent as UserIcon } from "../../Assests/svgs/userIcon.svg"
import SearchBar from "../searchBar/SearchBar";

export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav>

      <div className="navContainer">

        <div className="logo" onClick={() => navigate('/')}>
          Y
        </div>
        <SearchBar />
        <ChatBauble className="chatSVG svg" onClick={() => navigate('/messages')} />
        <Bell className="bellSVG svg" onClick={() => navigate('/notifications')} />
        <UserIcon className="userSVG svg" onClick={() => navigate('/myprofile')} />
      </div>
    </nav>
  );
}
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router";
import "./myprofile.scss"
import SinglePost from "../components/singlePost/SinglePost";
import MyProfileComponent from "../components/myProfile/MyProfileComponent";


import PocketBase from 'pocketbase';
import Loading from "../components/loading/Loading";

export const pb = new PocketBase('https://y-socials.pockethost.io/');

export default function MyProfile(){

const navigate = useNavigate()
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [userPosts, setUserPosts] = useState([])

useEffect(() => {
  pb.autoCancellation(false);
  async function fetchUserData() {
    try {
      // Check if user is authenticated
      if (pb.authStore.isValid) {
        const userData = await pb.collection('users').authRefresh();
        // console.log(userData.record)
        setUser(userData.record);
      } else {
        setError('User is not logged in');
        navigate('/login')
      }
    } catch (err) {
      setError('Failed to fetch user data');
      console.error(err.message);
      
    } finally {
      setLoading(false);
      
    }

  }
  fetchUserData();
}, []);

useEffect(() => {
  async function getUserPosts() {
    if (user) {
      try {
        const userPosts = await pb.collection("posts").getList(1, 50, {
          filter: `parent = "${user.id}"`,
          expand: "parent"
        });
        setUserPosts(userPosts.items);
        console.log(userPosts.items[0].id);
      } catch (err) {
        console.log(err);
      }
    }
  }

  getUserPosts();
}, [user]);

if (loading) {
  return <div className=""><Loading small={false} /></div>;
}



return (
  <div>
     {user ? (
      <>
      <br/>
    <MyProfileComponent 
      profilePic={`https://y-socials.pockethost.io/api/files/users/${user.id}/${user.avatar}`} 
      UserName={user.username}
      UserTag={user.user_tag}
      Followers={"0"}
      Following={"0"}
      
      />
      {userPosts.map((data) => (
        <SinglePost 
          key={data.hg}
          profilePic={`https://y-socials.pockethost.io/api/files/users/${data.parent}/${data.expand.parent.avatar}`}
          UserName={data.expand.parent.username} 
          PostText={data.post_text}
          PostImg={`https://y-socials.pockethost.io/api/files/posts/${data.id}/${data.post_img}`} 
          PostComments={data.comments.lenght || "0"}
          PostShares={data.shares_count || "0"}
          PostLikes={data.likes_count || "0"}
          PostViews={data.views_count || "0"}
        />
      ))}
      </>
    ) : (
      <div>No user data</div>
    )}
  </div>
);
}


  
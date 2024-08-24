import React, { useEffect, useState } from 'react';
import SinglePost from "../components/singlePost/SinglePost.jsx"
import './home.scss';

import Royce from "../Assests/Imgs/Royce.jpg"
import Post1 from "../Assests/Imgs/testPost1.png"
import PocketBase from 'pocketbase';
import Loading from '../components/loading/Loading.jsx';
import AddPost from '../components/addPost/AddPost.jsx';

export const pb = new PocketBase('https://y-socials.pockethost.io/');




export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    pb.autoCancellation(false);

    async function fetchPosts() {
      try {
        const resultList = await pb.collection('posts').getList(1, 50, {
          sort: '-created',
          expand: "parent"
        });
        setPosts(resultList.items);
        // console.log(resultList.items)
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally{
        setLoading(false)
        await fetchUserData()
        
      }
    }

    fetchPosts();
  }, []);

 
  async function fetchUserData() {
    try {
      // Check if user is authenticated
      if (pb.authStore.isValid) {
        const userData = await pb.collection('users').authRefresh();
        setUser(userData.record);
        // console.log(user.record)
        
      } else {
      console.log("user", user)
        setUser(false)
      }
    } catch (err) {
      
      console.error(err.message);
      
    } finally{
      
    }

  }
  


  if (loading){
    return(<Loading/>)
  }

 return (
    <>
      <br/>
      {posts.map(post => (
        <SinglePost
          key={post.id}
          postID={post.id}
          profilePic={`https://y-socials.pockethost.io/api/files/users/${post.parent}/${post.expand.parent.avatar}`} // You might want to fetch this from the user's profile
          UserName={post.expand.parent.username} // Assuming you have a user_name field
          PostText={post.post_text}
          PostImg={`https://y-socials.pockethost.io/api/files/posts/${post.id}/${post.post_img}`} // Assuming you have an image_url field
          PostComments={post.comments_count || "0"}
          PostShares={post.shares_count || "0"}
          PostLikes={post.likes_count || "0"}
          PostViews={post.views_count || "0"}
        />
      ))}
      {user != null  && <AddPost username={user.username} userID={user.id} avatar={user.avatar}/>}
    </>
  )
}
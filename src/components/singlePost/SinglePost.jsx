import React, { useEffect, useState } from "react";
import "./singlePost.scss"
import PocketBase from 'pocketbase';


import {ReactComponent as ChatBauble} from "../../Assests/svgs/chatBubble.svg"
import {ReactComponent as ShareIcon} from "../../Assests/svgs/share.svg"
import {ReactComponent as FavoriteIcon} from "../../Assests/svgs/favorite.svg"
import {ReactComponent as ViewsIcon} from "../../Assests/svgs/views.svg"
import {ReactComponent as PostIcon} from "../../Assests/svgs/post.svg"
import Loading from "../loading/Loading";

export const pb = new PocketBase('https://y-socials.pockethost.io/');

export default function SinglePost(
  {
    postID,
    profilePic, 
    UserName, 
    PostText,
    PostImg,
    PostComments,
    PostShares,
    PostLikes,
    PostViews
  })
{
  
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([""]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(showComments){
      pb.autoCancellation(false);

      async function fetchComments() {
        try {
          console.log(postID)
          const resultList = await pb.collection('posts').getList(1, 50, {
            filter: `id = "${postID}"`,
            expand: "comments.User"
           
          });
          setComments(resultList.items[0].expand.comments)
    
          console.log("this one",resultList.items[0].expand.comments)
          console.log(resultList.items)
          console.log("log comments", comments)
       
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
        finally {
          setLoading(false)
        }
      }

      fetchComments()
      // console.log("postID", postID)
    }
    
  }, [showComments])

  const postComment = async (e) => {
    e.preventDefault()

    try {
      const record = await pb.collection("comments").create({
        CommentText : commentText,
        // Post : postID,
        User : pb.authStore.model.id,
      })
      await pb.collection("posts").update(postID, {"comments+": record.id})

    // console.log(record)
    
    } catch (error){
      console.log("error", error)
    }
  }

  return(
    
    <div className="container">
      <div>
        <div className="purpleBar"></div>
        <div className="whiteBox">

          <div className="firstRow">
            <img className="profilePic" src={profilePic} alt="ProfilePic"></img>
            <div className="firstRowText">
            <h3>{UserName}</h3>
            <p>{PostText}</p>
            </div>
          </div>
      
          <div className="postContainer">
            <img className="postImg" src={PostImg} alt="Post Image" />
          </div>

          <div className="reactrionsContainer">
          
            <div className="commentContainer iconContainer" onClick={() => setShowComments(ShowComments => !ShowComments)}>
              <ChatBauble />
              <p>{PostComments}</p>
            </div>

            <div className="shareContainer iconContainer">
              <ShareIcon />
              <p>{PostShares}</p>
            </div>

            <div className="likeContainer iconContainer">
              <FavoriteIcon />
              <p>{PostLikes}</p>
            </div>

            <div className="likeContainer iconContainer">
              <ViewsIcon />
              <p>{PostViews}</p>
            </div>

          </div>
          
        </div>

        {showComments && (
          <>
          
        
        <div className="coolSeperator"></div>
        {loading ? (
          <>
          <Loading small={true}/>
          <div className="endPurpleBar"></div>
          </>
          ):(
            <>
        <div className="commentsContainer">
        <div className="acctualComments">
          {comments.map((comment) => (
            <div key={comment.id}>
             
            
              <img src={`https://y-socials.pockethost.io/api/files/users/${comment.expand?.User.id}/${comment.expand?.User.avatar}`} alt="User avatar"/>

              <div>
                <h4>{comment.expand?.User.username}</h4>
                <p>{comment.CommentText}</p>
              </div>  
            </div>
          ))}
        </div>

          <form className="commentsForm" onSubmit={postComment}>
            <input 
              type="text" 
              id="commentTextForm" 
              name="commentText"
              placeholder="comment" 
              autoComplete="off"
              required
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button type="submit">
            <PostIcon/>
            </button>
          </form>
          
        </div>
      
        <div className="endPurpleBar"></div>
        </>
        
      )}
      </>
      )}

        </div>
    </div>

    
    
    
  )
}
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ListComments } from "../components/ListComments";
import { Post } from "../components/Post";
import { AuthContext } from "../context/AuthContext";

export function SinglePost() {
  const isHomePage = false
  const [post, setPost] = useState({})
  const [comms, setComms] = useState([])
  const { user } = useContext(AuthContext)
  let { id } = useParams()

  const initRequest = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token,
    },
  }
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`, initRequest)
        const data = await res.json()
        setPost(data)
      } catch (err) {
        console.log('Error:', err);
      }
    }
    fetchPost()
  }, [])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/comments/${id}/comments`)
        const data = await res.json()
        setComms(data)
        // console.log(data);
        console.log('comms', comms);
      } catch (err) {
        console.log(err);
      }
    }
    fetchComments()
  }, [])
  
  return (
    <>
      <Header />
      
      {post && <Post isHomePage={isHomePage} onePost={post} key={post.id}/>
      }
      {/* <Post isHomePage={isHomePage} onePost={post} key={post.id}/> */}
      <Comments onePost={post}/>
      {comms.map(com => {
        return <ListComments comments={com} key={com.id}/>
      })}
      <Footer />
    </>
  )
}
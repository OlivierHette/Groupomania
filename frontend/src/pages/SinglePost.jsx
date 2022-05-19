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
        // console.log('comms', comms);
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
// const POST = {
//     User: {
//       id: 1,
//       username: 'username',
//       profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     id: 4,
//     date: '2022-04-28T08:23:27.000Z',
//     imageUrl:'https://images.unsplash.com/photo-1553104798-25100bb64c66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//     title:"Un titre qu'il faut adapter à la photo."
// }
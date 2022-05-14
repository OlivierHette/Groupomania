import { Header } from "../components/Header"
import { Post } from "../components/Post"
import { Footer } from "../components/Footer"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export function Home() {
  const isHomePage = true
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  const initRequest = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token,
    },
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/posts/", initRequest)
        const data = await res.json()
        console.log(data);
        setPosts(data)
      } catch (error) {
        console.log('Error:', error);
      }
    }
    fetchPosts()
  }, [])

  return (
    <>
      <Header />
      {posts.map(post => {
        return <Post isHomePage={isHomePage} onePost={post} key={post.id}/>
      })}
      <Footer />
    </>
  )
}
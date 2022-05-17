import { Header } from "../components/Header"
import { Post } from "../components/Post"
import { Footer } from "../components/Footer"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PostCreate } from "../components/PostCreate"

export function Home() {
  const isHomePage = true
  const [visible, setVisible] = useState(false)
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
        // console.log(data);
        setPosts(data)
      } catch (err) {
        console.log('Err:', err);
      }
    }
    fetchPosts()
  }, [])

  function handleClick(e) {
    e.preventDefault()
    setVisible(v => !v)
  }

  return (
    <>
      <Header />
      {/* <!-- Create post --> */}
      <div className="my-5">
        <button onClick={handleClick} className="flex items-center justify-center text-slate-300 mx-5 h-9 w-32 border-red-600 border border-solid rounded transition-colors hover:bg-red-800 duration-300 font-semibold">
          {visible
            ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-px" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
          }
          Publier
        </button>
      </div>
      {visible
        ? <PostCreate />
        : null
      }
      {posts.map(post => {
        return <Post isHomePage={isHomePage} onePost={post} key={post.id}/>
      })}
      <Footer />
    </>
  )
}
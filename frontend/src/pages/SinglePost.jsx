import { Comments } from "../components/Comments";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ListComments } from "../components/ListComments";
import { Post } from "../components/Post";
const POST = 
  {
    User: {
      id: 1,
      username: 'username',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    id: 1,
    date: '7h',
    imageUrl:'https://images.unsplash.com/photo-1553104798-25100bb64c66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    title:"Un titre qu'il faut adapter à la photo."
  }

export function SinglePost() {
  const isHomePage = false

  return (
    <>
      <Header />
      {/* {POST.map(post => {
        return <Post isHomePage={isHomePage} onePost={post} key={post.id}/>
      })} */}
      <Post isHomePage={isHomePage} onePost={POST} key={POST.id}/>
        <Comments />
        <ListComments />
      <Footer />
    </>
  )
}
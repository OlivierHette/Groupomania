import { Comments } from "../components/Comments";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ListComments } from "../components/ListComments";
import { Post } from "../components/Post";

export function SinglePost() {
  const isHomePage = false

  return (
    <>
      <Header />
      <Post isHomePage={isHomePage}/>
        <Comments />
          <ListComments />
      <Footer />
    </>
  )
}
import { Header } from "../components/Header"
import { Post } from "../components/Post"
import { Footer } from "../components/Footer"

export function Home() {
  const isHomePage = true

  return (
    <>
      <Header />
      <Post isHomePage={isHomePage} />
      <Post isHomePage={isHomePage} />
      <Post isHomePage={isHomePage} />
      <Footer />
    </>
  )
}

/**
 *  Pour <Post /> rajouter un état true ou false 
 *  et le passer ici ex :
 *  <Post isHomePage: true /> affiche le button
 *  et 
 *  <Post isHomePage: false /> cache le button pour la page post
 */
import {Header} from "../components/Header"
import {Footer} from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"

export function Signup() {
  const username = useRef()
  const email = useRef()
  const pass = useRef()
  const navigate = useNavigate()

  async function handleClick(e) {
    e.preventDefault()
    
    const user = {
      email: email.current.value,
      username: username.current.value,
      pass: pass.current.value
    }
    
    const initRequest = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    try {
      let res = await fetch('http://localhost:3001/api/auth/signup', initRequest)
      let data = await res.json()
      if(res.ok) {
        navigate('/')
        console.log(data);
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  return (
    <>
      <Header />
      <section>
        <div className="w-72 sm:w-96 lg:w-[500px] bg-slate-800 rounded-xl shadow-lg overflow-hidden pb-5">
          <div className="relative w-full h-full">
            <form onSubmit={handleClick}>
              <label className="text-white text-4xl font-bold flex justify-center m-6 cursor-pointer">Inscription</label>
              
              <input 
                placeholder="Pseudo"
                ref={username}
                name="text" 
                type="text" 
                className="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" 
                required
              />
              <input 
                placeholder="Email" 
                ref={email}
                type="email" 
                name="email" 
                className="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" 
                required 
              />
              <input 
                placeholder="Mot de passe" 
                ref={pass}
                type="password" 
                name="pass" 
                required 
                className="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" 
              />

              <button type="submit" className="w-3/4 h-10 my-2 mx-auto block justify-center text-white text-xl bg-red-600 font-bold mt-5 outline-none border-none rounded-md cursor-pointer transition-colors hover:bg-red-800 duration-300">
                S'inscrire
              </button>

              <Link to="/" className="flex justify-center mt-6 mx-auto text-white">
                <p> 
                  Déjà inscrit ? <span className="text-red-600 transition-colors hover:text-red-400 duration-300"> Connexion</span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
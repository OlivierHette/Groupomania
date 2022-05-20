import {Header} from "../components/Header"
import {Footer} from "../components/Footer"
import { Link } from "react-router-dom"
import { useContext, useRef } from "react"
import { AuthContext } from "../context/AuthContext"

async function loginCall(userCredential, dispatch) {
  const initRequest = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredential)
  }
  // console.log('userCredential:', userCredential);
  dispatch({ type: "LOGIN_START" })

  try {
    let res = await fetch('http://localhost:3001/api/auth/login', initRequest)
    let data = await res.json()
    if (res.ok) {
      console.log('Data err :', data);
      dispatch({ type: "LOGIN_SUCCES", payload: data })
    }
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE" })
    console.log(err);
  }
  
}

export function Login() {
  const username = useRef()
  const password = useRef()
  const {isFetching, dispatch} = useContext(AuthContext)

  function handleClick(e) {
    e.preventDefault()
    loginCall({
      username: username.current.value,
      pass: password.current.value,
    }, 
    dispatch)
  }
  
  return (
    <>
      <Header />
        <section>
          <div className="w-72 sm:w-96 lg:w-[500px] bg-slate-800 rounded-xl shadow-lg overflow-hidden pb-5">
            <div className="relative w-full h-full">
              <form onSubmit={handleClick}>
                <label className="text-white text-4xl font-bold flex justify-center m-6 cursor-pointer">Connexion</label>
                <input 
                  placeholder="Pseudo"
                  ref={username}
                  type="text" 
                  name="text" 
                  className="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" 
                  required 
                />
                <input 
                  placeholder="Mot de passe" 
                  ref={password}
                  type="password" 
                  name="pass" 
                  className="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" 
                  required 
                />

                { isFetching ? 
                <button className="w-3/4 h-10 my-2 mx-auto block justify-center text-white text-xl bg-red-900 font-bold mt-5 outline-none border-none rounded-md cursor-pointer transition-colors hover:bg-red-800 duration-300">
                  Connexion
                </button> :
                <button className="w-3/4 h-10 my-2 mx-auto block justify-center text-white text-xl bg-red-600 font-bold mt-5 outline-none border-none rounded-md cursor-pointer transition-colors hover:bg-red-800 duration-300">
                  Connexion
                </button>
                }               

                <Link to="/signup" className="flex justify-center mt-6 mx-auto text-white">
                  <p> 
                    Pas encore inscrit ? <span className="text-red-600 transition-colors hover:text-red-400 duration-300"> S'inscrire</span>
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
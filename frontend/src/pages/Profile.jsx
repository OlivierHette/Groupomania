import { useContext, useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { AuthContext } from "../context/AuthContext";

export function Profile() {
  const [userInfo, setUserInfo] = useState({})
  const [usernameInput, setUsername] = useState({ value: userInfo.username })
  const { user } = useContext(AuthContext)
  const usernameEdit = useRef()

  const date = new Date(userInfo.createdAt)
  const hasPP = false
  const PUBLIC_URL = process.env.PUBLIC_URL

  const initRequest = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token,
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/user/${user.id}`, initRequest)
        const data = await res.json()
        if (res.ok) {
          setUserInfo(data)
          setUsername({ value: data.username})
        }
      } catch (err) {
        console.log('Err:', err);
      }
    }
    fetchPosts()
  }, [])

  console.log('userInfo', userInfo);

  function handleChange (e) {
    setUsername({ value: e.target.value })
  }

  const initRequestEdit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    },
    body: JSON.stringify({ username: usernameInput.value })
  }

  async function onSubmitUser(e) {
    e.preventDefault()
    console.log('on rentre dans onSubmit ?');
    try {
      const res = await fetch(`http://localhost:3000/api/auth/user/${user.id}`, initRequestEdit)
      console.log('after fetch:', initRequestEdit);
      const data = await res.json()
      if (res.ok) {
        console.log('data',data);
        window.location.reload()
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }

  const initRequestDelete = {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    }
    // body: JSON.stringify({ userId: user.id})
  }
  
  async function onClickDelete(e) {
    e.preventDefault()
    
    try {
      const res = await fetch(`http://localhost:3000/api/auth/user/${user.id}`, initRequestDelete)
      const data = await res.json()
      if (res.ok) {
        console.log(data);
        localStorage.clear()
        window.location.reload(false)
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }
  
  return (
    <>
      <Header />
      
      <section>
        <form onSubmit={onSubmitUser} className="flex flex-col justify-center items-center w-64">
          <div>
            <h1 className= "text-slate-300 uppercase my-4">Profile</h1>
          </div>
          <div className="flex flex-col w-full">
            <div className="block max-w-full">
              <div className="relative flex justify-center items-center w-full overflow-hidden h-10 mx-auto border-slate-800 border border-solid">
                <div className="flex items-center w-11/12">
                <img 
                  className="h-5 w-5 rounded-full mr-3" 
                  src= { hasPP 
                          ? 'profileImageUrl'
                          : PUBLIC_URL + 'images/no-avatar.jpg'
                  }
                  alt="" 
                />
                  <span className="text-sm text-white truncate">Changer l'image de profile</span>
                  <label htmlFor="images" className="bg-white opacity-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full"></label>
                  {/* <input 
                    type="file" 
                    name="images"
                    id="images"
                    accept=".jpeg,.jpg,.png,.gif"
                    // onChange={(e) => setFile(e.target.files[0])} 
                    className="hidden" 
                  /> */}
                </div>
              </div>
            </div>

            <div className="border-slate-800 border border-solid p-2 flex mt-[-1px]">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <textarea 
                ref={usernameEdit}
                value={usernameInput.value}
                name="username" 
                id="username" 
                onChange={handleChange}
                rows="1" 
                className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-5 w-full font-semibold break-words text-sm focus:text-white" 
                maxLength="280">
              </textarea>
            </div>

            <div className="border-slate-800 border border-solid p-2 flex mt-[-1px]">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="outline-none overflow-hidden border-none bg-transparent text-slate-300 h-5 w-full font-semibold break-words text-sm">
                {userInfo.email}
              </span>
            </div>

            <div className="border-slate-800 border border-solid p-2 flex mt-[-1px]">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="outline-none overflow-hidden border-none bg-transparent text-slate-300 h-5 w-full font-semibold break-words text-sm">
                {date.toLocaleDateString("fr")}
              </span>
            </div>

            <div className="self-end my-4">
              <button onClick={onClickDelete} className="bg-red-600 text-white text-sm py-1 px-2 rounded-md transition-colors hover:bg-red-800 duration-300 font-semibold">
                Supprimer
              </button>
              <button type="submit" className="ml-3 bg-slate-700 text-white text-sm py-1 px-2 rounded-md hover:bg-slate-500 transition-colors duration-300">
                Sauvegarder
              </button>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </>
  )
}
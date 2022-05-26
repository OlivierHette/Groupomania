import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { AuthContext } from '../context/AuthContext'

export function Header() {
  const { user } = useContext(AuthContext)
  const [visible, setVisible] = useState(false)
  const PUBLIC_URL = process.env.PUBLIC_URL
  const hasPP = false

  function handleClick(e) {
    e.preventDefault()
    setVisible(v => !v)
  }

  function handleClickDeconnection (e) {
    e.preventDefault()
    localStorage.clear()
    window.location.reload(false)
  }

  return(
    <header className="bg-slate-800 w-full">
      <div className="container flex justify-center items-center justify-items-center mx-auto h-20 p-5 shadow-sm">
        <Link to="/">
          <img className="w-52" src={logo} alt="Logo de groupomania" />
        </Link>
        <nav>
          {user ? 
          <div className="ml-3 relative">
            <div>
              <button type="button" onClick={handleClick} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-600" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="sr-only">Ouvrir le menu utilisateur</span>
                <img 
                  className="h-8 w-8 rounded-full" 
                  src= { hasPP 
                          ? 'profileImageUrl'
                          : PUBLIC_URL + 'images/no-avatar.jpg'
                  }
                  alt="" 
                />
              </button>
            </div>
            {visible ?
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
              <Link to="#" className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                Profil
              </Link>
              <Link to="#" onClick={handleClickDeconnection} className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                Deconnexion
              </Link>
            </div> : null
            }
            
          </div> : null
          }
        </nav>
      </div>
    </header>
  )
}
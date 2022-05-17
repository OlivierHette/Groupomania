import { Link } from "react-router-dom"
import { useState } from "react"
import { CounterComments } from "./CounterComment"


export function Post({isHomePage, onePost}) {
  console.log(onePost);
  const {id, createdAt, imageUrl, title, User} = onePost
  // const {User: {username, profileImageUrl}} = onePost
  const [visible, setVisible] = useState(false)
  const date = new Date(createdAt)
  const PUBLIC_URL = process.env.PUBLIC_URL
  const hasPP = false

  function handleClick(e) {
    e.preventDefault()
    setVisible(v => !v)
  }

  // Verifi si l'objet n'est pas vide
  // if (User && User.prop) {
  //   return User.prop
  // }
  // User && User.prop ? User.prop : undefined
  // reviens a faire : User?.props

  return (
    <section className="flex flex-col justify-center items-center mt-3">
        {/* <!-- Post --> */}
        <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mb-3 mx-auto">
          <div className="flex justify-between items-center mx-5">          
            <div className="flex items-center">
                <img 
                  className="h-8 w-8 mr-3" 
                  src= { 
                    hasPP 
                    ? User?.profileImageUrl
                    : PUBLIC_URL + 'images/no-avatar.jpg'
                  } 
                  alt="" 
                />
                <p className="text-slate-400 text-sm">
                  <span className="mr-2">{User?.username}</span> . 
                  <span className="m ml-2">{date.toLocaleDateString("fr")}</span></p>
            </div>

            <div className="ml-3 relative">
              <div onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 cursor-pointer z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </div>
              {visible ? 
              <div className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <Link to="#" className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                  Editer
                </Link>
                <Link to="#" className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                  Supprimer
                </Link>
              </div> : null
              }
              
            </div>
            
          </div>

          <div>
            <h2 className="mx-5 mt-3 text-slate-300 text-lg font-semibold truncate">{title}</h2>
          </div>

          <div className="mx-5 my-3 bg-black">
            <Link to={`/post/` + id}>
              <div className="h-[250px] sm:h-[475px] relative overflow-hidden bg-black">
                <img className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" 
                  src={imageUrl} 
                  alt="La jungle" />
              </div>
            </Link>
          </div>
          {isHomePage ? <CounterComments /> : null}
        </div>
        {/* fin post */}
      </section>
  )
}
import { Link, useNavigate } from "react-router-dom"
import { useContext, useRef, useState } from "react"
import { CounterComments } from "./CounterComment"
import { AuthContext } from "../context/AuthContext"


export function Post({isHomePage, onePost}) {
  const { user }                                = useContext(AuthContext)
  const {id, createdAt, imageUrl, title, User}  = onePost

  const [visible, setVisible]                   = useState(false)
  const [visibleEdit, setVisibleEdit]           = useState(false)
  const [titlePost, setTitlePost]               = useState({value: title})
  const titleEdit                               = useRef()
  const navigate                                = useNavigate()

  const date                                    = new Date(createdAt)
  const PUBLIC_URL                              = process.env.PUBLIC_URL
  const hasPP                                   = false
  const isAdmin                                 = user.isAdmin
  
  const initRequest = {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    },
    body: JSON.stringify({ userId: user.id})
  }

  function handleClick(e) {
    e.preventDefault()
    setVisible(v => !v)
  }
  
  async function onClickDelete(e) {
    e.preventDefault()
    
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, initRequest)
      const data = await res.json()
      if (res.ok) {
        console.log(data);
        if (isHomePage) {
          window.location.reload()
        }
        return navigate('/')
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }

  function handleChange (e) {
    setTitlePost({value: e.target.value})
  }
  
  const initRequestEdit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    },
    body: JSON.stringify({ title: titlePost.value, userId: user.id })
  }

  function onClickShowEdit(e) {
    e.preventDefault()
    setVisibleEdit(v => !v)
    if (visible) {
      setVisible(v => !v)
    }
  }

  async function onSubmitEdit(e) {
    e.preventDefault()
    console.log('on rentre dans onSubmit ?');
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, initRequestEdit)
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

  const initRequestAdmin = {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    },
    body: JSON.stringify({ userId: user.id})
  }
  
  async function onClickDeleteAdmin(e) {
    e.preventDefault()
    
    try {
      const res = await fetch(`http://localhost:3001/api/posts/admin/${id}`, initRequestAdmin)
      const data = await res.json()
      if (res.ok) {
        console.log(data);
        if (isHomePage) {
          window.location.reload()
        }
        return navigate('/')
      }
    } catch (err) {
      console.log('Error:', err);
    }
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
                {/* <Link to="#" className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                  Editer
                </Link> */}
                <button onClick={onClickShowEdit} className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                  {visibleEdit
                    ? <span className="text-red-600">Annuler</span>
                    : 'Editer'
                  }
                  
                </button>
                {isAdmin
                ? <button onClick={onClickDeleteAdmin} className="active:bg-gray-100 block px-4 py-2 text-sm text-red-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                    Supprimer
                  </button>
                : <button onClick={onClickDelete} className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                    Supprimer
                  </button>
                }
              </div> : null
              }
              
            </div>
            
          </div>

          <div>
            {visibleEdit
              ? <div className="border-slate-800 border border-solid rounded-md p-2 flex mx-5 mt-3">
                    <textarea 
                      ref={titleEdit}
                      value={titlePost.value}
                      name="title" 
                      id="title" 
                      rows="1" 
                      onChange={handleChange}
                      className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-5 w-full font-semibold break-words leading-6" 
                      maxLength="280">
                    </textarea>
                    <div>
                      <span className="text-slate-400 text-sm">280</span>
                    </div>
                </div>
              : <h2 className="mx-5 mt-3 text-slate-300 text-lg font-semibold truncate">{title}</h2>
            }
          </div>

          <div className="mx-5 my-3 bg-black">
            <Link to={`/post/` + id}>
              {imageUrl === null
                ? null
                : <div className="h-[250px] sm:h-[475px] relative overflow-hidden bg-black">
                    <img className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" 
                      src={imageUrl} 
                      alt="La jungle" />
                  </div>
              }
            </Link>
          </div>
          <div className="flex">
            {isHomePage && !visibleEdit 
              ? <Link to={`/post/` + id} className="flex justify-center items-center mx-5 h-9 w-32 border-slate-400 border border-solid rounded transition-colors hover:bg-slate-800 duration-300">
                  <CounterComments className="self-start">Commentaire</CounterComments>
                </Link>
              : null
            }
            {visibleEdit
              ? <form onSubmit={onSubmitEdit} className="flex justify-center items-center mx-5">
                  <button type="submit" className="text-white text-sm bg-red-600 w-20 px-3 py-2 rounded-md font-semibold self-center">
                    Publier
                  </button>
                  <span onClick={onClickShowEdit} className="mx-1 px-3 py-2 text-slate-400 text-sm transition-colors hover:text-slate-50 duration-300 cursor-pointer">
                    Annuler
                  </span>
                </form>
              : null
            }
            
          </div>
        </div>
        {/* fin post */}
      </section>
  )
}
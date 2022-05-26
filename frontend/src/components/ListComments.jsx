import { useContext, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export function ListComments({comments}) {
  const {id, postId, content, createdAt, User} = comments
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [ContentComms, setContentComms] = useState({value: content})
  const contentEdit = useRef()
  const { user } = useContext(AuthContext)

  const date = new Date(createdAt)
  const PUBLIC_URL = process.env.PUBLIC_URL
  const hasPP = false
  const isAdmin = user.isAdmin

  function handleClick(e) {
    e.preventDefault()
    setVisible(v => !v)
  }

  const initRequest = {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    },
    body: JSON.stringify({ userId: user.id})
  }

  async function onClickDelete(e) {
    e.preventDefault()
    
    try {
      const res = await fetch(`http://localhost:3000/api/comments/${postId}/comments/${id}`, initRequest)
      const data = await res.json()
      if (res.ok) {
        console.log(data);
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
      const res = await fetch(`http://localhost:3000/api/comments/admin/${postId}/comments/${id}`, initRequestAdmin)
      const data = await res.json()
      if (res.ok) {
        console.log(data);
        window.location.reload()
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }

  function handleChange (e) {
    setContentComms({value: e.target.value})
  }
    
  const initRequestEdit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + user.token,
    },
    body: JSON.stringify({ userId: user.id, content: ContentComms.value })
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
      const res = await fetch(`http://localhost:3000/api/comments/${postId}/comments/${id}`, initRequestEdit)
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

  return (
    <section className="flex flex-col">
      <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mx-auto mt-5">
        <div className="mt-3 flex flex-col">
          <div className="flex justify-between mb-2 mx-5 items-center">
            <div className="flex items-center">
              <img 
                className="h-8 w-8 rounded-full mr-3" 
                src={ 
                  hasPP 
                  ? User?.profileImageUrl
                  : PUBLIC_URL + 'images/no-avatar.jpg'
                } 
                alt="img de profil de l'utilisateur" 
              />
              <p className="text-slate-400 text-sm">
                <span className="text-slate-300 font-semibold">{User.username}</span> . {date.toLocaleDateString("fr")}
              </p>
            </div>
            <div className="ml-3 relative">
              <div onClick={handleClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 cursor-pointer z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
              </div>
              {visible ? 
              <div className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
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
          {/* <div className="border-slate-800 border border-solid rounded-md p-2 flex mx-5 mt-3">
            <textarea 
              // ref={'titleEdit'}
              value={'titlePost.value'}
              name="title" 
              id="title" 
              rows="1" 
              onChange={'handleChange'}
              className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-5 w-full font-semibold break-words leading-6" 
              maxLength="280">
            </textarea>
            <div>
              <span className="text-slate-400 text-sm">280</span>
            </div>
          </div> */}
          {visibleEdit
            ? <form onSubmit={onSubmitEdit} className="flex flex-col mx-16 border-slate-800 border border-solid rounded-md ">
                <div className="border-slate-800 border-b border-solid p-2 flex">
                  <textarea 
                    value={ContentComms.value}
                    ref={contentEdit}
                    name="content-com" 
                    id="content-com" 
                    rows="1" 
                    onChange={handleChange}
                    className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-14 w-full text-xs break-words leading-6" 
                  ></textarea>
                </div>
                <div className="py-1.5 px-2 self-end">
                  <span onClick={onClickShowEdit} className="text-slate-400 text-sm mr-2 cursor-pointer">Annuler</span>
                  <button type="submit" className="text-white text-sm bg-red-600 w-16 px-2 py-1 rounded-sm font-semibold self-end">
                    Publier
                  </button>
                </div>
              </form>
            : <p className="mx-16 text-slate-300 text-sm">
                {content}
              </p>
          }
              {/* <p className="mx-16 text-slate-300 text-sm">
                {content}
              </p> */}
        </div>
      </div>
    </section>
  )
}
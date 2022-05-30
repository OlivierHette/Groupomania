import { useContext, useRef } from "react"
import { AuthContext } from "../context/AuthContext"

export function PostComment ({onePost}) {
  const { user }    = useContext(AuthContext)
  const content     = useRef()
  
  const PUBLIC_URL  = process.env.PUBLIC_URL
  const hasPP       = false

  async function submitHandler(e) {
    e.preventDefault()
    const newCom = {
      userId: user.id,
      postId: onePost.id,
      content: content.current.value,
    }

    if (content === '') {
      return console.log('empty');
    }

    const initRequest = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type" : "application/json",
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify(newCom)
    }
    try {
      let res = await fetch(`http://localhost:3001/api/comments/${onePost.id}/comments`, initRequest)
      let data = await res.json()
      if (res.ok) {
        window.location.reload()
        console.log(data);
      }
    } catch (err) {
      console.log('Error:', err);
    }
    console.log(content.current.value);

  }
  return (
    <div className="mt-3 flex">
      <div className="ml-5 flex">
        <img 
          className="h-8 w-8 rounded-full mr-3" 
          src={ 
            hasPP 
            ? null
            : PUBLIC_URL + 'images/no-avatar.jpg'
          }  
          alt="" 
        />
      </div>
      <form onSubmit={submitHandler} className="flex flex-col ml-3 mr-5 border-slate-800 border border-solid rounded-md w-full">
        <div className="border-slate-800 border-b border-solid p-2 flex">
          <textarea 
            placeholder="Ecrire un commentaire.."
            ref={content}
            name="content-com" 
            id="content-com" 
            rows="1" 
            required
            className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-14 w-full text-xs break-words leading-6" 
          ></textarea>
        </div>
        <div className="py-1.5 px-2 self-end">
          <span className="text-slate-400 text-sm mr-2">Annuler</span>
          <button type="submit" className="text-white text-sm bg-red-600 w-16 px-2 py-1 rounded-sm font-semibold self-end">
            Publier
          </button>
        </div>
      </form>
    </div>
  )
}
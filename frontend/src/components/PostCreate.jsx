import { useContext, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export function PostCreate() {
  const { user }        = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const title           = useRef()

  async function submitHandler(e) {
    e.preventDefault()
    
    const newPost = {
      userId: user.id,
      title: title.current.value,
      content: null
    }

    if (newPost.title === '') {
      return console.log('Empty');
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append("userId", newPost.userId)
      data.append("title", newPost.title)
      data.append("name", fileName)
      data.append("images", file)
      newPost.imageUrl = fileName
      try {
        let response = await fetch("http://localhost:3001/api/posts/", {
          method: 'POST',
          headers: {
            'Authorization' : 'Bearer ' + user.token,
          },
          body: data
        })
        let result = await response.json()
        console.log(response);
        if (response.ok) {
          window.location.reload()
          console.log(result);
        }
      } catch (err) {}
    }
  
    const initRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept" : "*/*",
        'Authorization' : 'Bearer ' + user.token,
      },
      body: JSON.stringify(newPost)
    }

    console.log(initRequest.body);

    if (!file) {
      console.log(false);
      try {
        let res = await fetch('http://localhost:3001/api/posts/', initRequest)
        if (res.ok) {
          window.location.reload()
        }
      } catch (err) {
        console.log('Error:', err);
      }
    }
  }
  
  return( 
    <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mb-5 mx-auto">
      <h2 className="font-semibold text-slate-300 mx-5 mb-3">Publier un post</h2>
      <form onSubmit={submitHandler} className="flex flex-col mx-5 border-slate-800 border border-solid rounded-md p-5">
        <div className="border-slate-800 border border-solid rounded-md p-2 flex">
          <textarea 
            placeholder="Titre" 
            ref={title}
            name="title" 
            id="title" 
            rows="1"
            required 
            className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-5 w-full font-semibold break-words leading-6" 
            maxLength="280">
          </textarea>
          <div>
            <span className="text-slate-400 text-sm">280</span>
          </div>
        </div>
        <div className="block max-w-full">
          <div className="relative flex justify-center items-center w-full overflow-hidden h-60 bg-black my-3 mx-auto border-slate-800 border border-solid rounded-md">
            <div className="flex flex-col items-center w-11/12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-slate-300 my-3 mx-auto">Drop une photo</span>
              <span>
                <button className="text-slate-300 text-sm bg-red-600 px-3 py-1 rounded-md font-semibold">
                  Upload..
                </button>
                <label htmlFor="images" className="bg-white opacity-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full"></label>
                <input 
                  type="file" 
                  name="images"
                  id="images"
                  accept=".jpeg,.jpg,.png,.gif"
                  onChange={(e) => setFile(e.target.files[0])} 
                  className="hidden" 
                />
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className="text-white text-sm bg-red-600 w-20 px-3 py-1 rounded-md font-semibold self-end">
          Publier
        </button> 
      </form>
    </div>
  )
}
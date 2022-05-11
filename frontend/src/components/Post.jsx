import { CounterComments } from "./CounterComment"

export function Post(props) {
  const username = 'username'
  const date = '4h'
  const profilePic = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  const postPic = 'https://images.unsplash.com/photo-1553104798-25100bb64c66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  const postTitle = "Un titre qu'il faut adapter à la photo."
  const isHomePage = props.isHomePage
  
  return (
    <section className="flex flex-col justify-center items-center mt-3">
        {/* <!-- Post --> */}
        <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mb-3 mx-auto">
          <div className="flex justify-between items-center mx-5">          
            <div className="flex items-center">
                <img className="h-8 w-8 mr-3" src={profilePic} alt="" />
                <p className="text-slate-400 text-sm">{username} . {date}</p>
            </div>

            <div className="ml-3 relative">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 cursor-pointer z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </div>

              {/* <div className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <a href="#" className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Editer</a>
                <a href="#" className="active:bg-gray-100 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Supprimer</a>
              </div> */}
            </div>
            
          </div>

          <div>
            <h2 className="mx-5 mt-3 text-slate-300 text-lg font-semibold truncate">{postTitle}</h2>
          </div>

          <div className="mx-5 my-3 bg-black">
            <a href="#">
              <div className="h-[250px] sm:h-[475px] relative overflow-hidden bg-black">
                <img className="w-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" src={postPic} alt="Photo de la mère" />
              </div>
            </a>
          </div>
          {isHomePage ? <CounterComments /> : null}
        </div>
        {/* fin post */}
      </section>
  )
}
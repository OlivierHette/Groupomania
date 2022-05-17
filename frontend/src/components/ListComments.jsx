export function ListComments({comments}) {
  const {id, userId, postId, content, createdAt, User} = comments
  const date = new Date(createdAt)
  const PUBLIC_URL = process.env.PUBLIC_URL
  const hasPP = false

  return (
    <section className="flex flex-col">
      <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mx-auto">
        <div className="mt-3 flex flex-col">
          <div className="ml-5 flex items-center mb-2">
            <img 
              className="h-8 w-8 rounded-full mr-3" 
              src={ 
                hasPP 
                ? User?.profileImageUrl
                : PUBLIC_URL + 'images/no-avatar.jpg'
              } 
              alt="" 
            />
            <p className="text-slate-400 text-sm">
              <span className="text-slate-300 font-semibold">{User.username}</span> . {date.toLocaleDateString("fr")}
            </p>
          </div>
          <p className="mx-5 text-slate-300 text-sm">
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}
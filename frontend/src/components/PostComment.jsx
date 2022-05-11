export function PostComment () {
  
  return (
    <div className="mt-3 flex">
      <div className="ml-5 flex">
        <img className="h-8 w-8 rounded-full mr-3" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </div>
      <form className="flex flex-col ml-3 mr-5 border-slate-800 border border-solid rounded-md w-full">
        <div className="border-slate-800 border-b border-solid p-2 flex">
          <textarea className="outline-none resize-none overflow-hidden border-none bg-transparent text-slate-300 h-14 w-full text-xs break-words leading-6" name="content-com" id="content-com" rows="1" placeholder="Ecrire un commentaire.."></textarea>
        </div>
        <div className="py-1.5 px-2 self-end">
          <span className="text-slate-400 text-sm mr-2">Annuler</span>
          <button type="submit" className="text-white text-sm bg-red-600 w-16 px-2 py-1 rounded-sm font-semibold self-end">Publier</button>
        </div>
      </form>
    </div>
  )
}
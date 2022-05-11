export function CounterComments () {
  const nbrComment = '24'

  return (
    <div className="items-start">
      <a href="#">
        <div className="flex justify-center items-center mx-5 h-9 w-24 border-slate-400 border border-solid rounded transition-colors hover:bg-slate-800 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-slate-400 text-sm">{nbrComment}</span>
        </div>
      </a>
    </div>
  )
}
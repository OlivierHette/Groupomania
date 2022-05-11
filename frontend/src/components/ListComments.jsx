export function ListComments() {
  
  return (
    <section className="flex flex-col">
      <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mx-auto">
        <div className="mt-3 flex flex-col">
          <div className="ml-5 flex items-center mb-2">
            <img className="h-8 w-8 rounded-full mr-3" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <p className="text-slate-400 text-sm"><span className="text-slate-300 font-semibold">Pseudo</span> . 4h</p>
          </div>
          <p className="mx-5 text-slate-300 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ipsam a qui, mollitia omnis molestiae illo aliquam dolor ducimus esse inventore maiores numquam, itaque quidem adipisci possimus expedita sit laborum?
          </p>
        </div>
      </div>
    </section>
  )
}
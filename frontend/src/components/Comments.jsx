import { PostComment } from "./PostComment";

export function Comments() {
  
  return (
    <>
      {/* <!-- Commentaires --> */}
      <section className="flex flex-col justify-center items-center">
        <div className="max-w-xs w-72 sm:max-w-xl sm:w-[575px] mx-auto">
          <div className="mx-5 self-start border-b border-solid border-slate-800 pb-2">
            <span className="text-slate-300 font-semibold text-sm">Commentaires</span>
          </div>
          <PostComment />
        </div>
      </section>
      {/* <!-- Fin commentaires --> */}
    </>
  )
}
import {Header} from "../components/Header"
import {Footer} from "../components/Footer"

export function Login() {

  return (
    <>
      <Header />
        <section>
          <div class="w-72 sm:w-96 lg:w-[500px] bg-slate-800 rounded-xl shadow-lg overflow-hidden pb-5">
            <div class="relative w-full h-full">
              <form>
                <label class="text-white text-4xl font-bold flex justify-center m-6 cursor-pointer">Connexion</label>
                <input type="text" name="text" placeholder="Pseudo" required class="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" />
                {/* <!-- <input type="email" name="email" placeholder="Email" required class="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" /> --> */}
                <input type="password" name="pass" placeholder="Mot de passe" required class="w-10/12 h-10 bg-slate-100 flex justify-center my-5 mx-auto p-2 border-none outline-none rounded-md" />
                <button class="w-3/4 h-10 my-2 mx-auto block justify-center text-white text-xl bg-red-600 font-bold mt-5 outline-none border-none rounded-md cursor-pointer transition-colors hover:bg-red-800 duration-300">
                  Connexion
                </button>

                <a href="#"  class="flex justify-center mt-6 mx-auto text-white">
                  <p> 
                    Pas encore inscrit ? <span class="text-red-600 transition-colors hover:text-red-400 duration-300"> S'inscrire</span>
                  </p>
                </a>
              </form>
            </div>
          </div>
        </section>
      <Footer />
    </>
  )
}
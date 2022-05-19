import logoRed from '../assets/images/logo-red.png'

export function Footer() {
  
  return(
    <footer className="bg-slate-800 w-full p-5 mt-5">
      <div className="container flex flex-col justify-between items-center mx-auto h-14 shadow-sm">
        <img className="w-40" src={logoRed} alt="Logo de groupomania" />
        <span className="text-white text-xs">© 2022 Groupomania</span>
      </div>
    </footer>
  )
}
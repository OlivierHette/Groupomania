import {Signup} from './pages/Signup';
import {Login} from './pages/Login'
import { Home } from './pages/Home';
import { SinglePost } from './pages/SinglePost';

function App() {
  return (
    <div className="bg-slate-900 flex flex-col justify-between items-center min-h-screen">
      {/* <Signup/> */}
      {/* <Login /> */}
      <Home />
      {/* <SinglePost /> */}
    </div>
  )
}

export default App;
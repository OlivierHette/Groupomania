import { Routes, Route } from "react-router-dom";
import {Signup} from './pages/Signup';
import {Login} from './pages/Login'
import { Home } from './pages/Home';
import { SinglePost } from './pages/SinglePost';

function App() {
  return (
    <div className="bg-slate-900 flex flex-col justify-between items-center min-h-screen">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/post" exact element={<SinglePost />} />
      </Routes>
    </div>
  )
}

export default App;
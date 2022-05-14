import {Signup} from './pages/Signup';
import {Login} from './pages/Login'
import { Home } from './pages/Home';
import { SinglePost } from './pages/SinglePost';
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext)

  return (
    <div className="bg-slate-900 flex flex-col justify-between items-center min-h-screen">
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Login />} />
        <Route path="/signup" exact element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/post/:id" exact element={user ? <SinglePost /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App;
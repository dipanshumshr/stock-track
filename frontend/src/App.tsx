import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      <Toaster  position="top-center" reverseOrder={false}/>
      <Outlet/>
    </div>
  )
}

export default App
import { SlOptionsVertical } from "react-icons/sl";
import logo from "../assets/icon.png";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";


type NavProps = {
    title: string;
};

function Navbar({ title }: NavProps) {

    const [isMenuOpen , setIsMenuOpen] = useState(false)
    const logout = useAuthStore(s => s.logout)
    const navigate = useNavigate()
 
    function handleLogout()
    {
        logout();
        navigate('/')
        setIsMenuOpen(false)
    }


    return (
        <nav className="bg-[#A6B28B] w-full px-4 sm:px-6 flex h-24 items-center justify-between border-b border-slate-700">

            <div className="flex items-center">
                <img src={logo} alt="Business Logo" className="h-18 w-auto" onClick={() => navigate("/dashboard")} />

                <h1 className="text-2xl  font-bold text-[#3E3F29] whitespace-nowrap ml-7">
                    {title}
                </h1>
            </div>

     
            <div className="relative">
                <SlOptionsVertical className="text-[#3E3F29] text-2xl cursor-pointer hover:text-white transition-colors duration-200" onClick={() => setIsMenuOpen(prev => !prev)} />
                {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div className="p-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left font-medium px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
              {/* More options can be added here later */}
            </div>
          </div>
        )}
            </div>
        </nav>
    );
}

export default Navbar;
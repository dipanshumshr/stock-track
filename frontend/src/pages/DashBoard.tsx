import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaPlusCircle, FaSearch, FaShoppingCart } from 'react-icons/fa';

function DashBoard() {
  return (
  
    <div className="bg-zinc-900 min-h-screen">
      <Navbar title="Dashboard" />

      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Link to="/stock/add" className="transform hover:-translate-y-1 transition-transform duration-200">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700 h-full">
              <FaPlusCircle className="text-4xl text-[#3E7B27] mb-4" />
              <h2 className="text-xl font-bold text-zinc-100 mb-2">
                Add Stock
              </h2>
              <p className="text-zinc-400">
                Enter details for new medicines and add them to the inventory.
              </p>
            </div>
          </Link>

          {/* Card 2: Search Stock */}
          <Link to="/stock/search" className="transform hover:-translate-y-1 transition-transform duration-200">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700 h-full">
              <FaSearch className="text-4xl text-[#D6D85D] mb-4" />
              <h2 className="text-xl font-bold text-zinc-100 mb-2">
                Search Stock
              </h2>
              <p className="text-zinc-400">
                Find specific medicines, view details, and edit stock levels.
              </p>
            </div>
          </Link>

          {/* Card 3: Create Sale Order */}
          <Link to="/sales/create" className="transform hover:-translate-y-1 transition-transform duration-200">
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700 h-full">
              <FaShoppingCart className="text-4xl text-[#3D8D7A] mb-4" />
              <h2 className="text-xl font-bold text-zinc-100 mb-2">
                Create Sale Order
              </h2>
              <p className="text-zinc-400">
                Generate a new bill for a customer by adding products from your inventory.
              </p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}

export default DashBoard;

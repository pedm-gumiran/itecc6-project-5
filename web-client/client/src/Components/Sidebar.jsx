import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import Button from './Button';
import { toast } from 'react-toastify';

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                closeToast(); // Close the toast
                navigate('/'); // Redirect
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      },
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // open sidebar by default on large screens
    };

    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#1E1E1E]">
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-2 z-100 p-2 rounded-md text-white"
        >
          {isOpen ? (
            <FiX size={30} className="hover:bg-gray-700" />
          ) : (
            <FiMenu size={30} className="hover:bg-gray-700" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 transform' : 'relative'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 bg-[#1E1E1E] border-white border-1 shadow-lg z-80 transition-transform duration-300 ease-in-out h-screen overflow-auto
        `}
      >
        <nav className="p-3 flex flex-col h-full">
          <div className="flex flex-col justify-center items-center">
            <hr className="my-6 border-white border w-full mt-29" />
          </div>
          <ul className="flex flex-col gap-3 mt-2 ">
            <Link
              to="/dashboard"
              className={`${
                location.pathname === '/dashboard'
                  ? ' bg-gray-700'
                  : 'bg-[#1E1E1E]'
              }`}
            >
              <li className="text-white text-xl flex items-center gap-3  hover:bg-gray-700 rounded p-2 cursor-pointer">
                <MdDashboard size={24} />
                <span>Dashboard</span>
              </li>
            </Link>

            <Link
              to="/addworkout"
              className={`${
                location.pathname === '/addworkout'
                  ? ' bg-gray-700'
                  : 'bg-[#1E1E1E]'
              }`}
            >
              <li className="text-white text-xl flex items-center gap-3 hover:bg-gray-700 rounded p-2 cursor-pointer">
                <IoMdAdd size={24} />
                <span>Add Workout</span>
              </li>
            </Link>
          </ul>
          <div className=" mt-auto">
            <hr className="my-6 border-white border w-full mt-20" />
            <div className="flex gap-7 items-center justify-between">
              <div className="text-white text-[15px] flex flex-col justify-center items-center ">
                <h2 className="underline">Pedro Gumiran Jr</h2>
                <p>User</p>
              </div>
              <Button
                onClick={handleLogout}
                className=" hover:bg-gray-700 rounded-[10px]"
                icon={<GrLogout size={30} color="white" />}
              />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

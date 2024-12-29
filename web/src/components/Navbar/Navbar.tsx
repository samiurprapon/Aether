import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineSegment, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logo = (
    <Link to='/'>
      <h1 className='text-2xl lg:text-5xl font-bold font-[Poppins]'>aether
        <span className='text-[#F37172]'>.</span>
      </h1>
    </Link>
  );

  return (
    <div className='text-center flex mt-2 justify-between'>
      <div>
        {logo}
      </div>
      <div>
        {/* dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => setIsSidebarOpen(true)}>
            <MdOutlineSegment className="text-[#F37172] mt-2 text-2xl lg:hidden" />
          </DropdownMenuTrigger>
        </DropdownMenu>

        <div className={`fixed top-0 left-0 h-screen w-48 bg-slate-100 border shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className='text-center'>
            <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4">
              <MdClose className="text-[#F37172] text-2xl" />
            </button>
            {logo}
          </div>
          <DropdownMenuLabel className="p-4">
            <Link to="">
              <Button className="bg-[#F37172] w-full" variant="outline">
                Sign up
              </Button>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-4">
            <Link to="">
              <Button className="bg-[#F37172] w-full" variant="outline">
                Log in
              </Button>
            </Link>
          </DropdownMenuLabel>
        </div>

        <div className='hidden lg:inline'>
          <Link to=''>
            <Button className='lg:mt-5 text-white font-semibold bg-[#F37172]' variant="outline">Sign up</Button>
          </Link>
          <Link to=''>
            <Button className='lg:mt-5 text-white font-semibold bg-[#F37172]' variant="outline">Log in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
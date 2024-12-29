import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router'

const Root = () => {
  return (
    <div className='max-w-[95%] mx-auto font-[Montserrat] '>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}

export default Root
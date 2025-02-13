import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
	return (
		<div className="mx-auto max-w-[95%] font-[Montserrat]">
			<Navbar></Navbar>
			<Outlet></Outlet>
		</div>
	);
};

export default Root;

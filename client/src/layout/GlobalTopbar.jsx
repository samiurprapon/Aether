import Logo from '../assets/images/logo.svg';
import HamburgerMenu from '../assets/images/menu.svg';
import { Button, IconButton, SvgIcon } from '@mui/material';
import { FaHome } from 'react-icons/fa';

const GlobalTopbar = () => {
	return (
		<div className='container mx-auto mt-8'>
			<div className='flex w-full flex-row items-center justify-around md:justify-between'>
				{/* <!-- logo --> */}
				<div className=''>
					<a href='/'>
						<img src={Logo} alt='aether text logo' />
					</a>
				</div>
				{/* <!-- menu --> */}
				<div className='flex items-center'>
					<ul className='flex'>
						<li className='mx-2 hidden md:block font-Montserrat'>
							<Button className='text-primary' variant='outlined'>
								Login
							</Button>
						</li>
						<li className='mr-2 hidden md:block'>
							<Button className='text-primary' variant='outlined'>
								Signup
							</Button>
						</li>
						{/* <li className='mr-2 hidden md:block '>
							<Button variant='outlined' size='medium'>
								<FaHome className='mr-1' /> Home
							</Button>
						</li> */}

						<li className='ml-1'>
							<Button variant='text'>
								<SvgIcon>
									<rect width='38' height='4.57143' rx='2.28572' fill='#F37172' />
									<rect x='6.83997' y='9.14282' width='31.16' height='4.57143' rx='2.28572' fill='#F37172' />
									<rect x='15.2' y='18.2858' width='22.8' height='4.57143' rx='2.28572' fill='#F37172' />
									<rect x='22.8' y='27.4286' width='15.2' height='4.57143' rx='2.28572' fill='#F37172' />
								</SvgIcon>
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default GlobalTopbar;

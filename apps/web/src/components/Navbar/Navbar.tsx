import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdOutlineSegment } from 'react-icons/md';

const Navbar = () => {
	return (
		<div className="mt-2 flex justify-between text-center">
			<div>
				<Link to="/">
					<h1 className="text-2xl font-bold lg:text-5xl">
						aether
						<span className="text-[#F37172]">.</span>
					</h1>
				</Link>
			</div>
			<div>
				{/* dropdown menu */}

				<DropdownMenu>
					<DropdownMenuTrigger>
						<MdOutlineSegment className="mt-2 text-2xl text-[#F37172] lg:hidden" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>
							<Link to="">
								{' '}
								<Button className="bg-[#F37172]" variant="outline">
									Sign up
								</Button>{' '}
							</Link>
						</DropdownMenuLabel>
						<DropdownMenuLabel>
							<Link to="">
								{' '}
								<Button className="bg-[#F37172]" variant="outline">
									Log in
								</Button>{' '}
							</Link>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</DropdownMenuContent>
				</DropdownMenu>

				<div className="hidden lg:inline">
					<Link to="">
						{' '}
						<Button className="bg-[#F37172] font-semibold text-white lg:mt-5" variant="outline">
							Sign up
						</Button>{' '}
					</Link>
					<Link to="">
						{' '}
						<Button className="bg-[#F37172] font-semibold text-white lg:mt-5" variant="outline">
							Log in
						</Button>{' '}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

import React from 'react';
import heroImage from '../../assets/eye-image.jpg';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { TfiApple } from 'react-icons/tfi';
import { FaGooglePlay } from 'react-icons/fa';

type Props = {};

const Hero: React.FC<Props> = () => {
	return (
		<div className="flex h-screen w-full bg-white">
			<div className="ml-24 mt-28 flex-1 overflow-auto p-4">
				<div>
					<h1 className="mt-3 text-7xl font-extrabold">
						Make <br /> Learning Fun!
					</h1>
					<p className="mt-3">
						Where your instructor knows the best <br /> way to make you understand.
					</p>
					<Link to="">
						<Button className="mt-10 rounded bg-[#F37172] px-10 py-5 text-white" variant="outline">
							Sign up for free
						</Button>
					</Link>
					<div>
						<p className="mt-32 font-bold">Or download the app: </p>
						<div className="flex">
							<Link to="">
								<Button className="mt-10 rounded-xl bg-black px-6 py-6 text-white" variant="outline">
									<div className=" ">
										<TfiApple className="w-full" />
									</div>

									<div>
										<p className="text-[.6rem] font-[400]">Available on the </p>
										<h1>Apple Store</h1>
									</div>
								</Button>
							</Link>
							<Link to="">
								<Button className="mt-10 rounded-xl bg-black px-6 py-6 text-white" variant="outline">
									<div className=" ">
										<FaGooglePlay className="w-full" />
									</div>

									<div>
										<p className="text-[.6rem] font-[400]">Get It On </p>
										<h1>Google Play</h1>
									</div>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-1 items-center justify-center">
				<img className="w-4/5" src={heroImage} alt="eye-image" />
			</div>
		</div>
	);
};

export default Hero;

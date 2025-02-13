import React from 'react';
import Hero from '../Hero/Hero';

type Props = {};

const Home: React.FC<Props> = () => {
	return (
		<div className="w-full bg-red-100">
			<Hero></Hero>
		</div>
	);
};

export default Home;

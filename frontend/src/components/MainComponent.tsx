import React from 'react';
import fds from '../assets/images/left-image.png';
import apple from '../assets/images/apple_store.svg';
import playstore from '../assets/images/play_store.svg';

interface MainContentProps {
	isDarkMode: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isDarkMode }) => {
	return (
		<main
			className={`flex flex-col-reverse md:flex-row items-center justify-between p-4 md:p-8 space-y-8 md:space-y-0 md:space-x-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
			{/* Text Content */}
			<div className="max-w-full md:max-w-xl text-center md:text-left space-y-6">
				{/* Heading with typewriter and flashing effect applied to entire heading */}
				<div className="text-4xl sm:text-5xl md:text-6xl font-bold">
					<h1 className={`block leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Make</h1>
					<h1 className={`block leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Learning Fun!</h1>
				</div>

				<p className={`text-base sm:text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
					Where your instructor knows the best way to make you understand.
				</p>

				{/* Button with enhanced hover effects */}
				<button
					className={`bg-red-400 text-white px-6 py-3 rounded-md mt-4 transition duration-300 ease-in-out transform hover:bg-red-500 hover:text-gray-100 hover:scale-105 hover:shadow-lg hover:border-2 hover:border-red-500`}>
					Sign up for free
				</button>

				{/* App Download Section */}
				<div className="pt-6">
					<span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Or download the app:</span>
					<div className="flex gap-4 pt-5 justify-center md:justify-start">
						<img src={apple} alt="Apple Store" className="w-32 h-auto transition duration-300 transform hover:scale-105" />
						<img src={playstore} alt="Play Store" className="w-32 h-auto transition duration-300 transform hover:scale-105" />
					</div>
				</div>
			</div>

			{/* Illustration with a smaller size */}
			<div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
				<img src={fds} alt="Illustration" className="w-full max-w-md md:max-w-lg transition duration-500 transform hover:scale-105" />
			</div>
		</main>
	);
};

export default MainContent;

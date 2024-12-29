import React from 'react';
import heroImage from '../../assets/eye-image.jpg';
import { Button } from '../ui/button';
import { TfiApple } from "react-icons/tfi";
import { FaGooglePlay } from 'react-icons/fa';

type Props = {};

const Hero: React.FC<Props> = () => {
  return (
    <div className='flex flex-col md:flex-row w-full font-[Montserrat]  h-screen bg-white'>
      {/* Image Section */}
      <div className='flex flex-1 justify-center items-center order-first md:order-last'>
        <img className='w-3/5 md:w-4/5' src={heroImage} alt="eye-image" />
      </div>

      {/* Text Section */}
      <div className='flex-1 p-4  ml-4 md:ml-24 mt-4 md:mt-28 md:text-left text-center'>
        
          <h1 className='text-2xl  md:text-3xl lg:text-7xl mt-3 font-extrabold'>Make <br /> Learning Fun!</h1>
          <p className='mt-3'>Where your instructor knows the best <br /> way to make you understand.</p>
          <a >
            <Button className='text-center mt-2 md:mt-10 rounded  md:px-10 md:py-5 bg-[#F37172] text-white' variant="outline">Sign up for free</Button>
          </a>
        
           <div className='md:mt-[-5rem]'>
           <p className='mt-8  md:mt-32 font-bold'>Or download the app: </p>
            <div className='flex text-center'>
             <div className=''>
             <a className='mx-16 md:mx-0'>
                <Button className='rounded-xl  mt-10 px-6 py-6 bg-black text-white' variant="outline">
                  <div>
                    <TfiApple className='w-full' />
                  </div>
                  <div>
                    <p className='text-[.6rem] font-[400]'>Available on the </p>
                    <h1>Apple Store</h1>
                  </div>
                </Button>
              </a>
             </div>
             
             <div  className=''>
             <a className=''>
                <Button className='rounded-xl mt-10 px-6 py-6 bg-black text-white' variant="outline">
                  <div>
                    <FaGooglePlay className='w-full' />
                  </div>
                  <div>
                    <p className='text-[.6rem] font-[400]'>Get It On </p>
                    <h1>Google Play</h1>
                  </div>
                </Button>
              </a>
             </div>
            </div>
           </div>
          
        
      </div>
    </div>
  );
};

export default Hero;

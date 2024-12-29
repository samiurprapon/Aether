import React from 'react';
import Hero from '../Hero/Hero';

type Props = {};

const Home: React.FC<Props> = () => {
  return (
    <div className='bg-red-100 w-full '>
      <Hero></Hero>
    </div>
  );
};

export default Home;
import React from 'react';
import RightComponent from '../components/layouts/RightComponent';
import LeftComponent from '../components/layouts/LeftComponent';
import MiddleComponent from '../components/layouts/MiddleComponent';

import '../styles/globals.css';

interface ComponentProps {
  style?: React.CSSProperties;
}

const Dashboard: React.FC = () => {
	 

  return (
    <main
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
    
      }}
    >
      <LeftComponent style={{  paddingTop:'35px', minWidth: '17%', minHeight: '100vh' }} />
      <MiddleComponent style={{  paddingTop:'50px', minWidth: '50%', minHeight: '100vh'}} />
      <RightComponent style={{  paddingTop:'50px', minWidth: '30%', minHeight: '100vh' }} />
    </main>
  );
};

export default Dashboard;

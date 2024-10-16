import React, { useState } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainComponent";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((prev) => !prev)} />
      <MainContent isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;

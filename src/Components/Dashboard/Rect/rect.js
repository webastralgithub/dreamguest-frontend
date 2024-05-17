import React, { useState } from 'react';


function App() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle Class</button>
      <div className={isActive ? 'aactive' : 'iinactive'}>
        This is the content whose class will be toggled.
      </div>
    </div>
  );
}

export default App;

import './App.scss';
import React from 'react';
import Home from './components/Home/Home';
import Characters from './components/Characters/Characters';
import Episodes from './components/Episodes/Episodes';
import Locations from './components/Locations/Locations';

function App() {
  return (
    <div className="App">
      {/* Home section */}
      <Home />

      {/* Characters section */}
      <Characters />

      {/* Episodes section */}
      <Episodes />

      {/* Locations section  */}
      <Locations />
    </div>
  );
}

export default App;

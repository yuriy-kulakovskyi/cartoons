import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import Characters from './components/Characters/Characters';
import Episodes from './components/Episodes/Episodes';

function App() {
  return (
    <div className="App">
      {/* Home section */}
      <Home />

      {/* Characters section */}
      <Characters />

      {/* Episodes section */}
      <Episodes />
    </div>
  );
}

export default App;

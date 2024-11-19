import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.tsx';
import React from 'react';
import GlobalContextProvider from './context/GlobalContext.tsx';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
      <Home />
      </GlobalContextProvider>
    </div>
  );
}

export default App;

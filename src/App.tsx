import React, { useEffect } from 'react';
import './App.css';

async function fecthAllCoins() {
  try {
    const data = await fetch('http://localhost:3007/all-coins')
    const toJson = await data.json()

    console.log(toJson)
  } catch (error) {

  }
}

function App() {

  useEffect(() => {
    fecthAllCoins()
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;

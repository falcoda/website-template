// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import './App.scss';

import { Toaster } from 'react-hot-toast';


import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';


function App() {
  
  

  return (
    <div className="App">
      
        <Router>
            <header>
              <Navbar/>   
            </header>
          
          
            <Routes>
                
                <>                
                  <Route path="/" element={<Home/>} />   
                  
                </>
            </Routes>
          
        
        </Router>
        <Toaster position="bottom-right" reverseOrder={false}/>
        
    </div>
  );
}

export default App;

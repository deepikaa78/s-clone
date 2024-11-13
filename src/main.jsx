import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerContextProvider from './Context/PlayerContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index path='/s-clone' element={<PlayerContextProvider><App/></PlayerContextProvider>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

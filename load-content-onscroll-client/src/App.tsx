import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { apiUrl } from './connections/apiUrl';
import { useQuery } from 'react-query';
import { ContentContainer } from './components/content/contentContainer';

function App() {  
  return (
    <div className="App">
      <ContentContainer />
    </div>
  );
}

export default App;

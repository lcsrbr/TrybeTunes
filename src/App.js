import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;

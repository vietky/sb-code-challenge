import React, { Component } from 'react';
import {
    Header
} from './components'
import Main from './Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
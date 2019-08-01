import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import  Test from './test/test';
class App extends React.Component{
  
  render(){
      return (
        <Router>
            <div className="App ">
                <Test />
            </div>
        </Router>

      );
  }

}

export default App;

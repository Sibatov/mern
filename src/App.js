import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
// import  Test from './test/test';
import Timeline from './components/timeline'
class App extends React.Component{
  
  render(){
      return (
        <Router>
            <div className="App myChart">
                {/*<Test />*/}
                <Timeline />
            </div>
        </Router>

      );
  }

}

export default App;

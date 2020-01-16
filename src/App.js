import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Body from './Containers/Body'
import Navber from './Pages/Main/Navbar/Navbar';
import Header from './Pages/Main/Header';
import About from './Pages/About/Index';

function App() {
  return (
    <div className="App">
      <Navber />
      <Body>
        <Switch>
          <Route path="/" exact component={Header} />
          <Route path="/about" exact component={About}/>
        </Switch>  

      </Body>
    </div>
  );
}

export default App;

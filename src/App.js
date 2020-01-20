import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import  * as actions from './store/actions';

import Body from './Containers/Body'
import Navber from './Components/Navbar/Navbar';
import Main from './Pages/Main/Main';
import About from './Pages/About/Index';

function App(props) {
  useEffect(() => {
    props.getUser()
  }, [props])
  return (
    <div className="App">
      <Navber />
      <Body>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/about" exact component={About}/>
        </Switch>  
      </Body>
    </div>
  );
}

// const mapStateToProps = ({user}) => ({
//   user
// });

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(actions.getUser())
})

export default connect(null, mapDispatchToProps)(App);

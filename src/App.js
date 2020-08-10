import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import  * as actions from './store/actions';

import Body from './Containers/Body'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Signup from './Components/Forms/Signup/SignupForm';
import Login from './Components/Forms/Login/LoginForm';

import Main from './Pages/Main/Main';
import Courses from './Pages/Courses/Courses';
import CoursePreview from './Pages/CoursePreview/CoursePreview';
import CourseBought from './Pages/CourseBought/CourseBought';
import MyCourses from './Pages/MyCourses/MyCourses';
import Cart from './Pages/Cart/Cart';
import Setting from './Pages/Setting/Setting';

function App({getUser, getCategories}) {
  useEffect(() => {
    getUser();
    getCategories();
  }, [getUser, getCategories]);
  return (
    <div className="App">
      <Navbar />
      <Body>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/courses" exact component={Courses}/>
          <Route path="/course-preview/:id" exact component={CoursePreview}/>
          <Route path="/course/:id" exact component={CourseBought}/>
          <Route path="/my-courses" exact component={MyCourses}/>
          <Route path="/cart" exact component={Cart}/>
          <Route path="/setting" exact component={Setting}/>
        </Switch>  
      </Body>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(actions.getUser()),
  getCategories: () => dispatch(actions.getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

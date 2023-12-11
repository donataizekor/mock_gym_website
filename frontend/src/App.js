import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/client/About';
import Courses from './pages/client/Courses';
import CoursesAdmin from './pages/admin/Courses';
import Homepage from './pages/client/Homepage'
import Membership from './pages/client/Membership';
import MembershipsAdmin from './pages/admin/MembershipsAdmin'
import Staff from './pages/admin/Staff';
import Users from './pages/admin/Users'
import Login from './pages/Login';
import Register from './pages/Register';
import MembershipForm from './pages/client/MembershipForm';
import Profile from './pages/client/Profile';
import ProtectedRoute from './pages/client/ProtecterRoute';
import Unauthorized from './components/Unauthorized';
import MembershipForms from './pages/admin/MembershipForms';
import Trainers from './pages/admin/Trainers';

export default function App() {

  return (

    <Router>
      <Switch>
        {/* client side */}
        <Route path="/" exact={true} component={Homepage} />
        <Route path="/about-page" component={About} />
        <Route path="/classes" component={Courses} />
        <Route path="/memberships" component={Membership} />
        <Route path="/membership-form" component={MembershipForm} />
        <ProtectedRoute path="/profile" component={Profile} />


        {/* admin side */}
        <ProtectedRoute path="/admin" exact={true} component={MembershipForms} />
        <ProtectedRoute path="/admin/classes" component={CoursesAdmin} />
        <ProtectedRoute path="/admin/memberships" component={MembershipsAdmin} />
        <ProtectedRoute path="/admin/trainers" component={Trainers} />
 
        <ProtectedRoute path="/admin/staff" component={Staff} />
        <ProtectedRoute path="/admin/users" component={Users} />

        {/* auth */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/unauthorized' component={Unauthorized} />
        

      </Switch>
    </Router>

  );
}



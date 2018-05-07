import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
// import '../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss';

// Containers
import { Full } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

// auth0
import { Redirect} from 'react-router-dom';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/*<Route exact path="/login" name="Login Page" component={Login} />*/}
          {/*<Route exact path="/register" name="Register Page" component={Register} />*/}
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
          <Route path="/" name="Home" render={(props) =>{
            return <Full auth={auth} {...props} />}
          }/>
        </Switch>
      </Router>
    );
  }
}

export default App;

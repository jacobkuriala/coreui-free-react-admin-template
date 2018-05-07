import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';

import { Auth0Lock} from 'auth0-lock';
import history from '../../history';
import Auth from "../../Auth/Auth";

class Full extends Component {
  constructor(props){
    super(props);
    console.log('Full constructor');
    this.lock = new Auth0Lock(
      'pfLIwsWrtUoFg63I5o7k3JPS7hOAB1cf',
      'drivemotors.auth0.com',{
        theme:{
          logo: 'https://www.drivemotors.com/assets/logos/drive_logo_march_14.svg'
        }

      }
    );
    this.lock.on("authenticated", function(authResult) {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      console.log('called loked.on');
      console.log(this);
      this.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          console.log('error');
          console.log(error);
          return;
        }
        console.log(authResult);
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        const auth = new Auth();
        auth.setSession(authResult);
        console.log(auth.isAuthenticated());
      });
    });
  }

  login() {
    // this.props.auth.login();
    this.lock.show();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log('render');
    console.log(this.props.auth.isAuthenticated());
    return (<div className="container">
        {
          isAuthenticated() && (
            <div className="app">
              <AppHeader fixed>
                <FullHeader auth={this.props.auth} />
              </AppHeader>
              <div className="app-body">
                <AppSidebar fixed display="lg">
                  <AppSidebarHeader />
                  <AppSidebarForm />
                  <AppSidebarNav navConfig={navigation} {...this.props} />
                  <AppSidebarFooter />
                  <AppSidebarMinimizer />
                </AppSidebar>
                <main className="main">
                  <AppBreadcrumb appRoutes={routes}/>
                  <Container fluid>
                    <Switch>
                      {routes.map((route, idx) => {
                          return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                              <route.component {...props} />
                            )} />)
                            : (null);
                        },
                      )}
                      <Redirect from="/" to="/dashboard" />
                    </Switch>
                  </Container>
                </main>
                <AppAside fixed hidden>
                  <FullAside />
                </AppAside>
              </div>
              <AppFooter>
                <FullFooter />
              </AppFooter>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                // onClick={this.login.bind(this)
                onClick={this.login.bind(this)}
              >
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    );
  }
}

export default Full;

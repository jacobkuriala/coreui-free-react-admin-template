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
import {EngineApi}  from './../../middleware/EngineAPI/Api';

class Full extends Component {
  constructor(props){
    super(props);
    console.log('Full constructor');

    this.state = {
      privateMessage: '',
      publicMessage: ''
    };
    if(!this.props.auth.isAuthenticated()){
      this.props.auth.lock.show();
    }
  }

  login() {
    // this.props.auth.login();
    this.props.auth.lock.show();
  }

  componentDidMount(){
    console.log('called full.js componentdidmount');
    EngineApi.getTestPublicApi( (message) =>{
      this.setState({ publicMessage:message });
    });
    EngineApi.getTestPrivateApi(this.props.auth, (message) => {
      this.setState({ privateMessage:message });
    });
  }

  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate');
    console.log(prevProps.auth.loggedin);
    console.log(this.props.auth.loggedin);
    if(prevProps.auth.loggedin !== this.props.auth.loggedin){
      // EngineApi.getTestPrivateApi(this.props.auth, (message) => {
      //   this.setState({ privateMessage:message });
      // });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { privateMessage, publicMessage } = this.state;
    console.log('called full.js render');
    console.log(this.props.auth.isAuthenticated());
    let displayHtml = null;
    if (isAuthenticated()){
      displayHtml = (<div>
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
                        return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={ props => (
                            <route.component {...props} auth={this.props.auth} />
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
              <div>
                {privateMessage}
              </div>
              <div>
                {publicMessage}
              </div>
              <FullFooter />
            </AppFooter>
          </div>
        </div>
      );
    } else {
      displayHtml = (
        <div className="container">
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
        </div>
      )
    }
    return displayHtml;
  }
}

export default Full;

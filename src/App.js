import React, {Component} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'typeface-roboto';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { DefaultTheme } from "./config/Theme";
import { STORAGE_KEYS } from './config/Constant';

import MasterTemplate from './component/MasterTemplate';
import ApiCreatePage from './page/api-create';
import ApiGeneratorPage from './page/api-generator';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoad:false
    }
  }

  PrivateRoute = ({component : Component, ...rest}) => {
    const currentApi = sessionStorage.getItem(STORAGE_KEYS.CURRENT_API) || '';
    return (
      <Route 
        {...rest}
        render={props =>
          currentApi.length > 0 ? (
            <Component {...props}/>
          ) : (
            <Redirect to="/create-api"/>
          )
        }
      />
    );
  }

  render(){
    return(
      <MuiThemeProvider theme={DefaultTheme}>
        <Router>
          <Switch>
            <Route path="/create-api" component={ApiCreatePage}/>

            <MasterTemplate>
              <this.PrivateRoute exact path="/" component={ApiGeneratorPage}/>
            </MasterTemplate>
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
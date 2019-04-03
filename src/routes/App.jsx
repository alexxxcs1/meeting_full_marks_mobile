import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
// import style from  './App.scss';

import Home from 'routes/Home'
import WxAuth from 'components/WxAuth'

class App extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <WxAuth />
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  
                  {/* 首页 */}
                  <Route path='/home' component={Home} />
                  <Redirect path='/' to='/home' />
                    
              </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;

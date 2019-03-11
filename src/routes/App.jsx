import React, { Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';
// import style from  './App.scss';

import Home from 'routes/Home'

class App extends Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  
                  {/* 首页 */}
                  <Route path='/home' component={Home} />
                    
              </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;

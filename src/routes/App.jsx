import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
// import style from  './App.scss';

import Home from 'routes/Home'
import WxAuth from 'components/WxAuth'

class App extends Component {
  componentDidMount(){
    document.body.addEventListener(
      "touchmove",
      function(e) {
        if (e.target.getAttribute('scroll')=='true') {//检测不锁滑动的标签
          //do nothing
        }else{
          //没有不锁滑动标签的则禁止滑动
          e.preventDefault();
        }
        
      },
      false
    );
    document.body.addEventListener(
      "ondragstart",
      function(e) {
        return false;
      },
      false
    );
  }
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

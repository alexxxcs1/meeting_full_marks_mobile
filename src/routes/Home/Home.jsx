import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom';
import style from './Home.scss'
import homeicon from 'assets/homeicon.png'
import infoicon from 'assets/infoicon.png'
import myicon from 'assets/myicon.png'

import IndexView from './View/IndexView'
import RegisterView from './View/RegisterView'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount()
  {
  }
  componentWillReceiveProps(nextprops){
  }
  render() {
    return (
      <div className={style.Box}>
        <div className={style.ContentBox}>
          <Switch>
            {/* 首页 */}
            <Route path='/home/index/:id' component={IndexView} />
            <Route path='/home/register/:id' component={RegisterView} />
            
            <Redirect from="/home" to="/home/index/null" />

          </Switch>
        </div>
        <div className={[style.BotNav,'childcenter'].join(' ')}>

          <div className={[style.IconBox,'childcenter childcolumn'].join(' ')}>
            <div className={style.IconImage}>
              <img src={homeicon} alt=""/>
            </div>
            <div className={style.IconText}>
              <p>首页</p>
            </div>
          </div>
          <div className={[style.IconBox,'childcenter childcolumn'].join(' ')}>
            <div className={style.IconImage}>
              <img src={infoicon} alt=""/>
            </div>
            <div className={style.IconText}>
              <p>大会信息</p>
            </div>
          </div>
          <div className={[style.IconBox,'childcenter childcolumn'].join(' ')}>
            <div className={style.IconImage}>
              <img src={myicon} alt=""/>
            </div>
            <div className={style.IconText}>
              <p>我的</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Home

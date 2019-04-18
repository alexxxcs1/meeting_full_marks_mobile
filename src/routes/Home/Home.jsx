import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom';
import style from './Home.scss'
import homeicon from 'assets/homeicon.png'
import infoicon from 'assets/infoicon.png'
import myicon from 'assets/myicon.png'

import IndexView from './View/IndexView'
import RegisterView from './View/RegisterView'
import MeetingView from './View/MeetingView'
import UserIndexView from './View/UserIndexView'
import UserSettingView from './View/UserSettingView'
import BindWechatView from './View/BindWechatView'
import PayWayView from './View/PayWayView'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.refreshProp = this.refreshProp.bind(this);
  }
  componentDidMount(){
    this.refreshProp(this.props);
  }
  componentWillReceiveProps(nextprops){
    this.refreshProp(nextprops);    
  }
  refreshProp(props){
    let hash = window.location.hash;
    let hasharray = hash.split('/');
    this.state.meetingid = hasharray[hasharray.length-1];
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.Box}>
        <div className={style.ContentBox}>
          <Switch>
            {/* 首页 */}
            <Route path='/home/index/:id' component={IndexView} />
            <Route path='/home/register/:id' component={RegisterView} />
            <Route path='/home/meeting/:id' component={MeetingView} />
            <Route path='/home/user/:id' component={UserIndexView} />
            <Route path='/home/setting/:id' component={UserSettingView} />
            <Route path='/home/bindwx/:id' component={BindWechatView} />
            <Route path='/home/pay/:id' component={PayWayView} />
            
            <Redirect from="/home" to="/home/index/null" />

          </Switch>
        </div>
        {/* <div className={[style.BotNav,'childcenter'].join(' ')}>

          <div className={[style.IconBox,'childcenter childcolumn'].join(' ')} onClick={()=>{window.location.hash='#/home/index/'+this.state.meetingid}}>
            <div className={style.IconImage}>
              <img src={homeicon} alt=""/>
            </div>
            <div className={style.IconText}>
              <p>首页</p>
            </div>
          </div>
          <div className={[style.IconBox,'childcenter childcolumn'].join(' ')} onClick={()=>{window.location.hash='#/home/meeting/'+this.state.meetingid}}>
            <div className={style.IconImage}>
              <img src={infoicon} alt=""/>
            </div>
            <div className={style.IconText}>
              <p>大会信息</p>
            </div>
          </div>
          <div className={[style.IconBox,'childcenter childcolumn'].join(' ')} onClick={()=>{window.location.hash='#/home/user/'+this.state.meetingid}}>
            <div className={style.IconImage}>
              <img src={myicon} alt=""/>
            </div>
            <div className={style.IconText}>
              <p>我的</p>
            </div>
          </div>

        </div> */}
      </div>
    )
  }
}

export default Home

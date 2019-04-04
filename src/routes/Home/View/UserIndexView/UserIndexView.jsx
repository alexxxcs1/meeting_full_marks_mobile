import React, { Component } from 'react'
import style from './UserIndexView.scss'

import settingicon from 'assets/settingicon.png'
import qricon from 'assets/qricon.png'
import {api} from 'common/app'
  
export class UserIndexView extends Component {
constructor(props) {
  super(props);
  this.state = {
    meetingid:null,

    username:null,
    userqr:null,
    meetingname:null,
    usercode:null,
    paystatus:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.getUserInfo = this.getUserInfo.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    let params = props.match.params;
    if (this.state.meetingid != params.id) {
      this.state.meetingid = params.id;
      this.setState(this.state);
      this.getUserInfo(params.id);
    }
}
getUserInfo(meetingid){
    api.getUserInfoIndex(meetingid).then(res=>{
        console.log(res);
        if (res.code === 200) {
            this.state.username = res.result.username;
            this.state.meetingname = res.result.title;
            this.state.usercode = res.result.str;
            this.state.paystatus = res.result.is_pay;
            this.state.userqr = res.result.erweima;
            this.setState(this.state);
        }else{
            alert(res.message);
        }
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div className={style.UserIndexView}>
        <div className={[style.HnadleGroup,'childcenter'].join(' ')}>
            <div className={[style.ColumnBox,'childcenter childcontentstart'].join(' ')}>
                <div className={style.SettingBox} onClick={()=>{window.location.hash = '#/home/setting/'+this.state.meetingid}}>
                    <img src={settingicon} alt=""/>
                </div>
            </div>
            <div className={[style.ColumnBox,'childcenter childcontentend'].join(' ')}>
                {
                this.state.is_pay?
                <div className={[style.PayStatusButton,'childcenter'].join(' ')}>已缴费</div>:
                <div className={[style.PayStatusButton,'childcenter'].join(' ')} onClick={(()=>{window.location.hash='#/home/pay/'+this.state.meetingid}).bind(this)}>未缴费</div>
                }
            </div>
        </div>
        <div className={[style.UserInfo,'childcenter childcolumn'].join(' ')}>
            {/* <div className={style.FrontSilk}></div>
            <div className={style.BackSilk}></div> */}
            <div className={[style.UserInfoDetail,'childcenter childcolumn'].join(' ')}>
                <div className={[style.MeetingTitle,'childcenter'].join(' ')}>{this.state.meetingname==null?'':this.state.meetingname}</div>
                <div className={[style.QRbox,'childcenter childcolumn'].join(' ')}>
                    <div className={style.UserName}>
                        {this.state.username==null?'':this.state.username}
                    </div>
                    <div className={style.UserQRCode}>
                        <img src={this.state.userqr==null?'':this.state.userqr} alt=""/>
                    </div>
                    <div className={style.UserCode}>
                        识别码:{this.state.usercode==null?'':this.state.usercode}
                    </div>
                </div>
                <div className={[style.Tips,'childcenter'].join(' ')}>
                    向主办方出示该二维码用于会中服务
                </div>
            </div>
        </div>
    </div>
   )
   }
}
export default UserIndexView
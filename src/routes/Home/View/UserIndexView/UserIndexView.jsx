import React, { Component } from 'react'
import style from './UserIndexView.scss'

import settingicon from 'assets/settingicon.png'
import qricon from 'assets/qricon.png'

  
export class UserIndexView extends Component {
constructor(props) {
  super(props);
  this.state = {
    meetingid:null
  };
     this.refreshProps = this.refreshProps.bind(this);
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
    }
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
                <div className={[style.PayStatusButton,'childcenter'].join(' ')}>未缴费</div>
            </div>
        </div>
        <div className={[style.UserInfo,'childcenter childcolumn'].join(' ')}>
            {/* <div className={style.FrontSilk}></div>
            <div className={style.BackSilk}></div> */}
            <div className={[style.UserInfoDetail,'childcenter childcolumn'].join(' ')}>
                <div className={[style.MeetingTitle,'childcenter'].join(' ')}>会议名称代文字，这是一个会议名称 2018 P&G Tencent JBP Signing Ceremony</div>
                <div className={[style.QRbox,'childcenter childcolumn'].join(' ')}>
                    <div className={style.UserName}>
                        吴欣娟
                    </div>
                    <div className={style.UserQRCode}>
                        <img src={qricon} alt=""/>
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
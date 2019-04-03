import React, { Component } from 'react'
import style from './IndexView.scss'
import signupicon from 'assets/signupicon.png'
import qricon from 'assets/qricon.png'

import {api} from 'common/app'
  
export class IndexView extends Component {
constructor(props) {
  super(props);
  this.state = {
    meetingid:null,
    meetinginfo:null,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.getIndexInfo = this.getIndexInfo.bind(this);
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
      this.getIndexInfo(params.id);
    }
}
getIndexInfo(id){
    api.getMeetingIndex(id).then(res=>{
        console.log(res);
        if (res.code === 200) {
            this.state.meetinginfo = res.result;
            this.setState(this.state);
        }
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div className={style.ViewBox}>
        {/* ViewBox:IndexView:{this.state.meetingid?'true':'false'} */}
        <div className={[style.MeetingCard,'childcenter childcolumn'].join(' ')}>
            <div className={style.KVBox}>
                <img src={this.state.meetinginfo?this.state.meetinginfo.cover:''} alt=""/>
            </div>
            <div className={style.MeetingInfo}>{this.state.meetinginfo?this.state.meetinginfo.title:'加载中...'}</div>
            <div className={[style.MeetingDetail,'childcenter childcontentstart'].join(' ')}>
                <span>{this.state.meetinginfo?this.state.meetinginfo.strat_time:'加载中...'} {this.state.meetinginfo?this.state.meetinginfo.strat_time_week:''}</span>
            </div>
            <div className={[style.MeetingDetail,'childcenter childcontentstart'].join(' ')}>
                <span>{this.state.meetinginfo?this.state.meetinginfo.address:'加载中...'}</span>
                <div className={style.GoDetailButton}></div>
            </div>
            
        </div>
        {this.state.meetinginfo?<div className={[style.HandleGroup,'childcenter childcolumn'].join(' ')}>
            <div className={[style.ButtonBox,'childcenter'].join(' ')} onClick={()=>{window.location.hash = '#/home/register/'+this.state.meetinginfo.id}}>
                <div className={[style.IconBox,style.purple,'childcenter'].join(' ')} >
                    <img src={signupicon} alt=""/>
                </div>
                <div style={{'--themecolor':'#604494'}} className={[style.ButtonValueBox,'childcenter childcolumn childalignstart'].join(' ')}>
                    <div className={style.Value}>
                        我要报名
                    </div>
                    <div className={style.Tips}>
                        参会报名点这里
                    </div>
                </div>
            </div>
            <div className={[style.ButtonBox,'childcenter'].join(' ')} onClick={()=>{window.location.hash = '#/home/bindwx/'+this.state.meetinginfo.id}}>
                <div className={[style.IconBox,style.blue,'childcenter'].join(' ')}>
                    <img src={qricon} alt=""/>
                </div>
                <div style={{'--themecolor':'#006FCE'}} className={[style.ButtonValueBox,'childcenter childcolumn childalignstart'].join(' ')}>
                    <div className={style.Value}>
                        我已报名
                    </div>
                    <div className={style.Tips}>
                        参会报名点这里
                    </div>
                </div>
            </div>
        </div>:''}
    </div>
   )
   }
}
export default IndexView
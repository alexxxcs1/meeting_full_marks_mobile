import React, { Component } from 'react'
import style from './IndexView.scss'
import signupicon from 'assets/signupicon.png'
import qricon from 'assets/qricon.png'
  
export class IndexView extends Component {
constructor(props) {
  super(props);
  this.state = {
    meetingid:null,
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
  this.state.meetingid = isNaN(props.match.params.id)?null:props.match.params.id;
  this.setState(this.state);
}
render() {
  return (
    <div className={style.ViewBox}>
        {/* ViewBox:IndexView:{this.state.meetingid?'true':'false'} */}
        <div className={[style.MeetingCard,'childcenter childcolumn'].join(' ')}>
            <div className={style.KVBox}></div>
            <div className={style.MeetingInfo}>这是会议名称代文字 Dancing together for infinties / 2018 P&G Tencent JBP Signing Ceremony</div>
            <div className={[style.MeetingDetail,'childcenter childcontentstart'].join(' ')}>
                <span>12.22 08:00 星期六</span>
                <span>广州柏悦酒店</span>
                <div className={style.GoDetailButton}></div>
            </div>
        </div>
        <div className={[style.HandleGroup,'childcenter childcolumn'].join(' ')}>
            <div className={[style.ButtonBox,'childcenter'].join(' ')}>
                <div className={[style.IconBox,style.purple,'childcenter'].join(' ')}>
                    <img src={signupicon} alt=""/>
                </div>
                <div style={{'--themecolor':'#604494'}} className={[style.ButtonValueBox,'childcenter childcolumn childalignstart'].join(' ')}>
                    <div className={style.Value}>
                        报名
                    </div>
                    <div className={style.Tips}>
                        参会报名点这里
                    </div>
                </div>
            </div>
            <div className={[style.ButtonBox,'childcenter'].join(' ')}>
                <div className={[style.IconBox,style.blue,'childcenter'].join(' ')}>
                    <img src={qricon} alt=""/>
                </div>
                <div style={{'--themecolor':'#006FCE'}} className={[style.ButtonValueBox,'childcenter childcolumn childalignstart'].join(' ')}>
                    <div className={style.Value}>
                        报名
                    </div>
                    <div className={style.Tips}>
                        参会报名点这里
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
   }
}
export default IndexView
import React, { Component } from 'react'
import style from './PayWayView.scss'
import {Redirect} from 'react-router-dom';

import {api} from 'common/app'
  
export class PayWayView extends Component {
constructor(props) {
  super(props);
  this.state = {
    meetingid:null,
    PayMoney:null,
    OtherPayQR:null,
    UserPayStatus:false,
    showOtherPay:false,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.getMeetingPay = this.getMeetingPay.bind(this);
     this.goWxPay = this.goWxPay.bind(this);
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
    this.getMeetingPay(params.id);
  }
}
getMeetingPay(meetingid){
  api.getMeetingPay(meetingid).then(res=>{
    console.log(res);
    if (res.code === 200) {
      this.state.PayMoney = res.result.money;
      this.state.UserPayStatus = res.result.status;
      this.state.OtherPayQR = res.result.code_url;
      this.setState(this.state);
    }else{
      alert(res.message);
    }
  },err=>{
    console.log(err);
    
  })
}
goWxPay(meetingid){
  window.location.href = 'http://www.huibaifen.com/index.php/index/wxpay/index?meetid='+meetingid;
  // api.getWxPayConfig(meetingid).then(res=>{
  //   console.log(res);
  //   if (res.code === 200) {
  //       let self = this;
  //       window.wx.chooseWXPay({
  //         timestamp: res.result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
  //         nonceStr: res.result.nonceStr, // 支付签名随机串，不长于 32 位
  //         package: res.result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
  //         signType: res.result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
  //         paySign: res.result.paySign, // 支付签名
  //         success: function (res) {
  //         // 支付成功后的回调函数
  //           window.location.hash = '#/home/user/'+this.state.meetingid;
  //         },
  //         cancel:function(res) {
            
  //         },
  //         fail:function(res) {
  //             alert("支付失败");
  //             console.log(res);
              
  //         }
  //         });      
  //   }else{
  //     alert(res.message);
  //   }
  // },err=>{
  //   console.log(err);
    
  // })

}
render() {
  return (
    <div className={[style.PayWayView, 'childcenter childcontentstart childcolumn'].join(' ')}>
        <div className={[style.ViewTitle, 'childcenter childalignstart childcolumn'].join(' ')}>
            <div className={[style.NameValue].join(' ')}>
                费用缴纳
            </div>
        </div>
        <div className={[style.PayBox,'childcenter childcolumn'].join(' ')}>
            {this.state.UserPayStatus==0?[
              <div className={style.PayMoney}>
                {this.state.PayMoney?this.state.PayMoney:''}元
            </div>,
            this.state.showOtherPay?<div className={style.OtherPayQrCode}>
              {this.state.OtherPayQR?<img src={"http://www.huibaifen.com/index.php/api/Qrcode/showQrcode?url="+window.encodeURIComponent(this.state.OtherPayQR)+"&size=300"} alt=""/>:''}
            </div>:'',
            <div className={[style.SelfPayButton,'childcenter'].join(' ')} onClick={this.goWxPay.bind(this,this.state.meetingid)}>使用微信付款</div>,
            <div className={[style.OtherButton,'childcenter'].join(' ')} onClick={(()=>{this.setState({showOtherPay:true})}).bind(this)}>找他人代付</div>,
            <div className={[style.OtherButton,'childcenter'].join(' ')} onClick={()=>{window.location.hash='#/user/'+this.state.meetingid}}>暂不缴费下次再说</div>
            ]:
              <Redirect to={'/home/user/'+this.state.meetingid}/>
            }
        </div>
    </div>
   )
   }
}
export default PayWayView
import React, { Component } from 'react'
import style from './PayWayView.scss'
  
export class PayWayView extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
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
            <div className={style.PayMoney}>
                {Number.MAX_SAFE_INTEGER}元
            </div>
            <div className={[style.SelfPayButton,'childcenter'].join(' ')}>使用微信付款</div>
        </div>
    </div>
   )
   }
}
export default PayWayView
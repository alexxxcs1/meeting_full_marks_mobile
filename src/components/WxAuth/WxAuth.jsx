import React, { Component } from 'react'
import style from './WxAuth.scss'

import {api} from 'common/app'
  
export class WxAuth extends Component {
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
  this.isAuth();
}
refreshProps(props) {
  
}
isAuth(){
    console.log('---------');
    api.getWxAuth(window.location.href).then(res=>{
        console.log(res);
        if (res.code === 200) {
            window.location.href = res.data.url;
        }
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div style={{display:'none'}}>
    
    </div>
   )
   }
}
export default WxAuth
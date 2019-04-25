import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    //获取该会议报名字段
    customer.getRegisterField = (meetid) => {
        return ajaxinstance.post('index/meeting/getMeetingRegisterField',qs.stringify({
          meetid
        }));
      }
    //提交报名
    customer.ApplyRegister = (meetid,data) => {
        return ajaxinstance.post('index/users/apply',qs.stringify({
          meetid,...data
        }));
      }
    //获取会议首页
    customer.getMeetingIndex = (meetid) => {
        return ajaxinstance.post('index/index/index',qs.stringify({
          meetid
        }));
      }
    //获取会议详情
    customer.getMeetingInfo = (meetid) => {
      return ajaxinstance.post('index/meeting/index',qs.stringify({
        meetid
      }));
    }
    //获取用户信息
    customer.getUserInfo = (meetid) => {
      return ajaxinstance.post('index/users/getUserinfo',qs.stringify({
        meetid
      }));
    }
    //获取用户信息
    customer.updateUserInfo = (meetid,option,uid) => {
      return ajaxinstance.post('index/users/update',qs.stringify({
        meetid,...option,uid
      }));
    }
    //获取绑定用户验证码
    customer.getRegisterCode = (meetid,mobile) => {
      return ajaxinstance.post('index/users/getCode',qs.stringify({
        meetid,mobile
      }));
    }
    //获取绑定用户验证码
    customer.BindWechat = (meetid,mobile,code) => {
      return ajaxinstance.post('index/users/bindMeeting',qs.stringify({
        meetid,mobile,code
      }));
    }
    //获取微信授权地址
    customer.getWxAuth = (url) => {
      return ajaxinstance.post('index/weixin/authurl',qs.stringify({
        url
      }));
    }
    //获取会收费金额及用户付费情况
    customer.getMeetingPay = (meetid) => {
      return ajaxinstance.post('index/Wxpay/natvie',qs.stringify({
        meetid
      }));
    }
    //获取微信支付配置
    customer.getWxPayConfig = (meetid) => {
      return ajaxinstance.post('index/Wxpay/index',qs.stringify({
        meetid
      }));
    }
    //获取个人中心信息
    customer.getUserInfoIndex = (meetid) => {
      return ajaxinstance.post('index/users/index',qs.stringify({
        meetid
      }));
    }
    //判断是否注册
    customer.getIsApply = (meetid) => {
      return ajaxinstance.post('index/users/is_apply',qs.stringify({
        meetid
      }));
    }
    
    
    
    
    return customer
  }
  
  export default AskPost
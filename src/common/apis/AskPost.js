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
    
    return customer
  }
  
  export default AskPost
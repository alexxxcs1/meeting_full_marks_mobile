import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    customer.askQuestions = (hospital,department,content) => {
        return ajaxinstance.post('askQuestions',qs.stringify({
            hospital:hospital,
            department:department,
            content:content
        }));
      }
    return customer
  }
  
  export default AskPost
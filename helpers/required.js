const sanitize = require("sanitize-html");


const SanitizeInput = (inputBody) =>{

    if(typeof inputBody === 'string'){
      return sanitize(inputBody)
    } else if(Array.isArray(inputBody)){
      return inputBody.map(SanitizeInput)
    } else if(typeof inputBody === 'object' && inputBody !== null){
      return Object.keys(inputBody).reduce( (r, key)=>{
        r[key] = SanitizeInput(inputBody[key])
        return r
      }, {})
    }
    
    return inputBody
  
  }
  
  module.exports.sanitizeInput = SanitizeInput
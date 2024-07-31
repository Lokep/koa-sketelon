
const okCode = 0


module.exports.Result = (data = null, code = okCode, message = null) => ({
  res: okCode,
  message,
  data
})



module.exports.okCode = okCode


module.exports.OK = (data, message) => module.exports.Result(data, okCode, message)


module.exports.Error = (code, message) => module.exports.Result(null, code, message)

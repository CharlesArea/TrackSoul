const cloneObj = (obj) => {
  var newObj = {}
  if (obj instanceof Array) {
    newObj = []
  }
  for (var key in obj) {
    var val = obj[key]
    // newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
    newObj[key] = typeof val === 'object' ? cloneObj(val) : val
  }
  return newObj
}
export default cloneObj

(function (root) {
  var jQuery = function () {
    return new jQuery.prototype.init()
  }

  jQuery.fn = jQuery.prototype = {
    init: function () {

    }
  }

  /**
   * extend
   */
  jQuery.extend = jQuery.fn.extend = function () {
    var deep = false
    var target = arguments[0] || {}
    var length = arguments.length
    /**
     * i 表示遍历被复制的对象时，起始 index。
     * 如果第一个参数为 target 对象，则 i 为 1，即从第二个开始遍历
     * 如果参数长度等于 i，表示 target 对象后面没有被复制的对象，
     *    则 target 就是被复制的，复制到 this，即 jQuery 或 jQuery.prototype
     *    此时遍历就从 target 开始，需要 i--
     */
    var i = 1
    var option, name, src, copy, isCopyArray

    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      i++
    }

    if (typeof target !== 'object') {
      target = {}
    }

    if (length === i) {
      target = this
      i--
    }

    for (i; i < length; i++) {
      // option 赋值语句必须加括号，否则先执行后面的判断语句
      if ((option = arguments[i]) !== null) {
        /**
         * 不需要判断 option 是否是对象或者数组，字符串也可以使用 for...in，其他类型不报错
         */
        for (name in option) {
          src = target[name]
          copy = option[name]
          if (deep  && (jQuery.isPlainObject(copy) || (isCopyArray = jQuery.isArray(copy)))) {
            if (isCopyArray) {
              // 重置 isCopyArray
              isCopyArray = false
              src = src && jQuery.isArray(src) ? src : []
            } else {
              src = src && jQuery.isPlainObject(src) ? src : {}
            }
            // 不要忘了传递 deep
            target[name] = jQuery.extend(deep, src, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  }

  jQuery.extend({
    isPlainObject (value) {
      return toString.call(value) === '[object Object]'
    },
    isArray (value) {
      return toString.call(value) === '[object Array]'
    }
  })

  jQuery.fn.init.prototype = jQuery.fn

  root.$ = root.jQuery = jQuery
})(this)
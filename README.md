# 1. jquery 整体架构 - 核心功能函数

jQuery 实例直接通过 $() 得到，但是在 jQuery 函数中，不能直接返回 `new jQuery()`，因为会重复调用 jQuery 函数，造成内存泄漏。

## 共享原型

通过在 jQuery 的原型上，添加 `init` 函数，然后在 jQuery 函数中，返回 init 函数的实例。

```javascript
var jQuery = function () {
  return new jQuery.prototype.init()
}
jQuery.prototype = {
  init: function () {
  }
}
```

为了让 init 的实例上，能够调用 jQuery 原型对象上的属性方法，可以通过共享原型对象，让 init 的原型等于 jQuery 的原型。

```javascript
jQuery.prototype.init.prototype = jQuery.prototype
```

## fn

`extend` 函数，可以通过 `$.extend()` 和 `$.fn.extend()` 两种方式调用。当只传入一个参数时，第一种方式会扩展 jQuery 对象，第二种方式会扩展 jQuery 原型对象。

只需要将 `jQuery.fn` 等于 `jQuery.prototype`，即可实现第二种方式扩展原型。





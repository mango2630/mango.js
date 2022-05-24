# mango.js
A simple to use JS library
---
原称其为 mango.js ！
方便使用、处理部分兼容问题。

---

实现的函数：

  1. getStyle(obj, attr) 获取元素obj的样式属性attr值。
  2. getPseduoStyle(obj, pseudo, attr) 获取元素obj的伪类的属性值。
  3. valid(num, n) 保留n位有效数字。
  4. randomInt(min, max) 求[min, max] 范围内的随机数。
  5. doMove(obj, option, time = 300, endFn) 动画移动效果。
  6. timeFormat(myTime = new Date()) 格式化时间格式。
  7. zeroFill(n) 单个数字前面补零。
  8. getMonthDay(y, m) 返回y年month月的天数。
  9. getDate(futureTime) 返回未来某一时间点到当下时间的相差时间。
  10. offsetWindow(obj) 获得元素相对于窗口的水平、垂直距离。
  11. winOption(attr, value) 浏览器窗口对象的属性值设置。
  12. nextElement(ele) 求元素的下一个兄弟节点。
  13. prevElement(ele) 求元素的上一个兄弟节点。
  14. eleIndexof(ele, n) 求该节点的父元素的第n个子节点。
  15. nextAll(obj) 求该元素的之后的所有兄弟节点。
  16. preAll(obj) 求该元素之前的所有兄弟节点。
  17. siblingsAll(obj) 求该元素的所有兄弟节点。
  18. inParBefore(oTag, oPar, n) 将新的标签插入到某标签的第n个子节点之前。
  19. getOrRemoveText(content) 返回浏览器光标选中的文字。
  20. debounce(timeInternal, zoomBody) 防抖
  21. throttle(timeInternal,zoomBody) 节流
  22. bind(obj, attr, fn) 监听事件封装。
  23. stopBubble(e) 阻止冒泡形为。
  24. stopDefault(e) 阻止浏览器默认行为。
  25. delegation(obj, ele, attr, fn) 事件委托。
  26. upOrDown(e) 判断鼠标滚轮滚动方向。
  27. toJsFormat(attr) 将烤串语法转换成驼峰语法。
  28. qfw(str) 求数字字符串的千分位形式。
  29. emailJudge(str) email 正则判断。
  30. idJudge(str) 身份证正则判断。
  31. ajax(option) Ajax 请求封装。{method, url, data, SFn, EFn}

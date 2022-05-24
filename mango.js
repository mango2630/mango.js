/**
 * 原称其为 mango.js ！
 * 自定义 JavaScript 库。
 * 方便使用、处理部分兼容问题。
 * 实现的函数：
 * 1. getStyle(obj, attr) 获取元素obj的样式属性attr值。
 * 2. getPseduoStyle(obj, pseudo, attr) 获取元素obj的伪类的属性值。
 * 3. valid(num, n) 保留n位有效数字。
 * 4. randomInt(min, max) 求[min, max] 范围内的随机数。
 * 5. doMove(obj, option, time = 300, endFn) 动画移动效果。
 * 6. timeFormat(myTime = new Date()) 格式化时间格式。
 * 7. zeroFill(n) 单个数字前面补零。
 * 8. getMonthDay(y, m) 返回y年month月的天数。
 * 9. getDate(futureTime) 返回未来某一时间点到当下时间的相差时间。
 * 10. offsetWindow(obj) 获得元素相对于窗口的水平、垂直距离。
 * 11. winOption(attr, value) 浏览器窗口对象的属性值设置。
 * 12. nextElement(ele) 求元素的下一个兄弟节点。
 * 13. prevElement(ele) 求元素的上一个兄弟节点。
 * 14. eleIndexof(ele, n) 求该节点的父元素的第n个子节点。
 * 15. nextAll(obj) 求该元素的之后的所有兄弟节点。
 * 16. preAll(obj) 求该元素之前的所有兄弟节点。
 * 17. siblingsAll(obj) 求该元素的所有兄弟节点。
 * 18. inParBefore(oTag, oPar, n) 将新的标签插入到某标签的第n个子节点之前。
 * 19. getOrRemoveText(content) 返回浏览器光标选中的文字。
 * 20. debounce(timeInternal, zoomBody) 防抖
 * 21. throttle(timeInternal,zoomBody) 节流
 * 22. bind(obj, attr, fn) 监听事件封装。
 * 23. stopBubble(e) 阻止冒泡形为。
 * 24. stopDefault(e) 阻止浏览器默认行为。
 * 25. delegation(obj, ele, attr, fn) 事件委托。
 * 26. upOrDown(e) 判断鼠标滚轮滚动方向。
 * 27. toJsFormat(attr) 将烤串语法转换成驼峰语法。
 * 28. qfw(str) 求数字字符串的千分位形式。
 * 29. emailJudge(str) email 正则判断。
 * 30. idJudge(str) 身份证正则判断。
 * 31. ajax(option) Ajax 请求封装。{method, url, data, SFn, EFn}
 */


/**
 * 获取元素obj的样式属性attr值。
 * @param {*} obj 
 * @param {String} attr 
 * @returns {String}
 */
function getStyle(obj, attr) { 
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]; 
} 

/**
 * 获取元素obj的伪类的属性值。
 * @param {*} obj 
 * @param {*} pseudo 
 * @param {*} attr 
 * @returns {String}
 */
function getPseduoStyle(obj, pseudo, attr) {
    return getComputedStyle(obj, pseudo).getPropertyValue(attr)
}

/**
 * 保留n位有效数字。
 * @param {Number} num 
 * @param {Number} n 
 * @returns {Number}
 */
function valid(num, n) {
    return Math.round(num*10**n) / 10**n;
}

/**
 * 求[min, max]范围内的随机数。
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
function randomInt(min, max) {
    var little = Math.min(min,max);
    var big = Math.max(min,max);

    return Math.round(Math.random() * (big - little)) + little;
}

/**
 * 动画移动效果。
 * @param {*} obj 
 * @param {Object} option 
 * @param {Number} time 
 * @param {Function} endFn 
 */
function doMove(obj, option, time = 300, endFn) {
    var endFn = endFn || function() {
        console.log("我执行完啦！！");
    }
    var arr = [];
    for (item in option) {
        var oj = {};
        oj.attr = item;
        oj.end = option[item];
        oj.start = parseFloat(getStyle(obj, item));
        oj.step = valid((oj.end - oj.start) * 1000 / time / 60, 2);

        arr.push(oj);
    }
    cancelAnimationFrame(obj.timer);
    obj.timer = requestAnimationFrame(function goto() {
        for (var i = 0; i < arr.length; i ++) {
            var len = parseFloat(getStyle(obj, arr[i].attr)) + arr[i].step;
            if (len >= arr[i].end && arr[i].step > 0 || len <= arr[i].end && arr[i].step < 0) {
                len = arr[i].end;
            }

            obj.style[arr[i].attr] = (arr[i].attr == "opacity" ? len : len + "px");
        }

        obj.timer = requestAnimationFrame(goto);
        if (len == arr[arr.length - 1].end) {
            cancelAnimationFrame(obj.timer);
            endFn();
        }
    })
}

/**
 * 格式化时间格式。
 * 输出格式：yyyy/mm/dd 星期二 13:55:43
 * @param {Date()} myTime 
 * @returns {String} 
 */
function timeFormat(myTime = new Date()) {
    var iYear = myTime.getFullYear(); //获取年 
    var iMonth = myTime.getMonth()+1; //获取月，月份是0-11的数字，需要在结果上+1 
    var iDate = myTime.getDate(); //获取日 
    var iWeek = myTime.getDay(); //获取星期，星期是0-6的数字需要变换一下才能用 
    var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]; 
    var sWeek = weeks[iWeek]; 
    var iHours = myTime.getHours(); //获取时 
    var iMin = myTime.getMinutes(); //获取分 
    var iSec = myTime.getSeconds(); //获取秒 

    return tFormat(iYear) +'/'+tFormat(iMonth)+'/'+tFormat(iDate)+' '+sWeek+' '+tFormat(iHours)+':'+tFormat(iMin)+':'+tFormat(iSec); 
}

/**
 * 单个数字前面补零。
 * @param {Number} n 
 * @returns {Number}
 */
function zeroFill(n) { //个位数前面补0 
    return n < 10 ? "0" + n : "" + n; 
}

/**
 * 返回y年month月的天数
 * @param {Number} y year
 * @param {Number} m month
 * @returns {Number} 
 */
function getMonthDay(y, m) {
    // 2020-10-09 0:0:0
    var time = new Date(y + "-" + tFormat(m + 1) + "-01 0:0:0");
    time.setDate(time.getDate() - 1);

    return time.getDate()
}

/**
 * 返回futureTime到当下时间的相差时间。
 * 使用场景：倒计时。
 * @param {new Date()} futureTime  future timestamp(未来某一时间的时间戳)
 * @returns {String}
 */
function getDate(futureTime) {
    var nowDate = new Date();
    var diffTime = Math.round((futureTime.valueOf() - nowDate.valueOf()) / 1000); // 秒数
    var day = Math.floor(diffTime / 86400); //天数
    var hour = Math.floor(diffTime % 86400 / 3600); // 小时数
    var minute = Math.floor(diffTime % 86400 % 3600 / 60);
    var second = Math.floor(diffTime % 60);

    return day + "天 " + hour + ":" + minute + ":" + second;
}

/**
 * 获得元素相对于窗口的水平、垂直距离。
 * @param {Object} obj 页面标签
 * @returns {Array}
 */
function offsetWindow(obj) {
    var nowLeft = obj.offsetLeft;
    var nowTop = obj.offsetTop;
    // console.log(nowLeft, nowTop);
    // offsetLeft：不包含父 border
    // clientLeft：相当于左边框
    while(obj.offsetParent){
        obj = obj.offsetParent;
        nowLeft += obj.clientLeft + obj.offsetLeft;
        nowTop += obj.clientTop + obj.offsetTop;
    }
    return [nowLeft, nowTop];
}

/**
 * 浏览器窗口对象的属性值设置
 * @param {String} attr document的属性
 * @param {*} value 要设置的值
 * @returns 
 */
function winOption(attr, value) { 
    // documentElement 返回文档对象（document）的根元素的只读属性（如HTML文档的 <html> 元素）。
    // 取值
    if(typeof value == 'undefined'){ 
        return document.documentElement[attr] || document.body[attr]; 
    } 

    // 返回值
    document.documentElement[attr] = value; 
    document.body[attr] = value; 
} 

/****************** 兄弟节点相关操作  *********************/
/**
 * 求元素的下一个兄弟节点。
 * @param {*} ele 
 * @returns 
 */
function nextElement(ele) { 
    return ele.nextElementSibling || ele.nextSibling; 
} 

/**
 * 求元素的上一个兄弟节点。
 * @param {*} ele 
 * @returns 
 */
function prevElement(ele) { //封装上一个兄弟节点 
    return ele.previousElementSibling || ele.previousSibling; 
} 

/**
 * 求该节点的父元素的第n个子节点。
 * @param {*} ele 
 * @param {Number} n 第n个兄弟节点
 * @returns 
 */
function eleIndexof(ele, n) {
    return ele.parentNode.children[n]; 
}

/**
 * 求该元素的之后的所有兄弟节点。
 * @param {*} obj 
 * @returns {Array} 
 */
function nextAll(obj) {
    var arr = [];
    while (nextElement(obj)) {
        arr.push(nextElement(obj));
        obj = nextElement(obj);
    }
    // console.log(arr);
    return arr;
}

/**
 * 求该元素之前的所有兄弟节点。
 * @param {*} obj 
 * @returns 
 */
function preAll(obj) {
    var arr = [];
    while(prevElement(obj)) {
        if (prevElement(obj).nodeType == 1) {
            arr.unshift(prevElement(obj));
            
        }  
        obj = prevElement(obj);
    }
    return arr;
}

/**
 * 求该元素的所有兄弟节点。
 * @param {*} obj 
 * @returns 
 */
function siblingsAll(obj) {
    var arr = [];
    arr = [...preAll(obj), ...nextAll(obj)]
    console.log(arr);
    return arr;
}

/**
 * 将新的标签插入到某标签的第n个子节点之前。
 * 将oTag标签插入到oPar的第n个子节点之前。
 * @param {object} oTag 要插入的标签
 * @param {Object} oPar 要插入标签的父标签
 * @param {Number} n 插入位置
 */
function inParBefore(oTag, oPar, n) {
    oPar.children[n] ? oPar.insertBefore(oTag, oPar.children[n]) : oPar.appendChild(oTag);
}

/**
 * 求浏览器光标选中的文字。
 * 如果没有传参，就会删除选中的内容，目前存在兼容性为题
 * @param {String} content 为真或假的任意数据类型，不传参是假
 * @returns 
 */
function getOrRemoveText(content) { 
    // window.getSelection().toString() 输出浏览器选中的文字
    if(content){ 
        return window.getSelection ? window.getSelection().toString() : document.selection.createRange().text; 
    }else{ 
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty() 
    } 
} 

/**
 * 防抖，time时间内持续触发，每次都会重新计算间隔时间。
 * 实例：百度搜索。
 * 此处为非立即防抖
 * @param {Number} timeInternal 
 * @param {*} zoomBody 
 * @returns 
 */
function debounce(timeInternal, zoomBody) { 
    //间隔时间和要设置防抖函数的函数 
    var timer; 
    return function() { 
        //返回防抖函数 
        var ars = Array.from(arguments); //接收参数并转为数组 
        var thisObj = this; //接收this指向 
        clearTimeout(timer); //阻止连续触发 
        
        timer = setTimeout(function (){ 
            zoomBody.apply(thisObj, ars); 
            //成功执行函数，将this和参数赋予zoomBody 
        }, timeInternal);
    } 
} 

/**
 * 节流，每隔固定时间调用一次函数，而不是一触发事件就调用函数，减少资源浪费。
 * @param {Number} timeInternal 
 * @param {*} zoomBody 
 * @returns 
 */
function throttle(timeInternal,zoomBody) { 
    //间隔时间和要设置节流函数的函数 
    var startTime = new Date(); //开始的时间 
    return function() { 
        //返回节流函数 
        var ars = Array.from(arguments); //接收参数并转为数组 
        var thisObj = this; //接收this指向 
        var newTime = new Date(); //这次触发时的时间 
        if(newTime-startTime>timeInternal){ 
            //如果距离上次执行函数超过间隔时间 
            startTime = newTime; 
            zoomBody.apply(thisObj,ars); 
            //执行函数，将this和参数赋予zoomBody 
        } 
    } 
} 

/**
 * 监听事件封装。
 * 第三个参数默认情况为ture,事件冒泡（从内到外）。
 * 第三个参数改为false,为事件捕获（从外到内）。
 * @param {Object} obj 监听对象
 * @param {*} attr 监听事件
 * @param {Function} fn 调用方法
 */
function bind(obj, attr, fn) {
    // 判断是否为低版本浏览器
    if(obj.addEventListener){
        // 标准浏览器没有on
        // console.log("标准");
        obj.addEventListener(attr, fn, false);
    }else{
        // console.log("低版本");
        // IE浏览器调用的函数为倒叙
        obj.attachEvent("on"+attr, function (){
            fn.call(obj);
        });
    }
}

/**
 * 阻止冒泡。
 * @param {Object} e 要阻止冒泡的事件
 */
function stopBubble(e) { 
    //该处的event应该为外面传进来的 
    if ( e && e.stopPropagation ){ 
        //非IE浏览器 
        e.stopPropagation(); 
    }else { 
        //使用IE的方式来取消事件冒泡 
        window.event.cancelBubble = true; 
    } 
}

/**
 * 阻止浏览器默认行为。
 * eg: 组织链接跳转等。
 * @param {Object} e 
 */
function stopDefault( e ) { 
    if ( e && e.preventDefault ){ 
        // 非IE浏览器 
        e.preventDefault(); 
    }else { 
        window.event.returnValue = false;   
    } 
    return false;
}

/**
 * 事件委托。
 * 原理：JS 事件冒泡。
 * eg: ul 列表下的每个 li 标签添加点击事件。
 * @param {*} obj 要委托的元素
 * @param {String} ele 想委托元素（#container, .class, li)
 * @param {String} attr 委托事件
 * @param {*} fn 委托事件执行内容
 */
function delegation(obj, ele, attr, fn) {
    bind(obj, attr, function (){
        var tar = event.target || event.srcElement; 
        // console.log(tar, event.target);

        if(ele[0] === "#" && ("#" + tar.id) === ele || 
            ele[0]==="." && tar.className.indexOf(ele.substring(1))!=-1 || 
            /[a-z]/.test(ele[0]) && 
            tar.nodeName.toLowerCase() === ele.toLowerCase()){ 
            //判断委托元素字符开头字符是什么
            fn.call(tar); 
        } 
    })
}
// delegation(oUl, "li", "click", function (){
//     console.log(123);
// })

/**
 * 判断鼠标滚轮滚动方向
 * firfox datail(-3 3)
 * ie google wheelDelta(120)
 * @param {*} e 
 * @returns {Number} 向上为1，向下为0
 */
function upOrDown(e) { 
    console.log(e);
    if(e.wheelDelta){ 
        return e.wheelDelta > 0 ? 1 : 0; 
    }else{ 
        return e.detail < 0 ? 1 : 0; 
    } 
} 
// bind(oUl, "mousewheel", function (event) {
//     console.log(this); // ul
//     console.log(event); // wheelevent
//     console.log(upOrDown(event));
// })

/**
 * 将烤串语法转换成驼峰语法。
 * 正则表达式。
 * @param {String} attr 
 * @returns 
 */
function toJsFormat(attr) {
    return attr.replace(/-([a-z])/g, function ($0, $1){
        return $1.toUpperCase();
    })
}

/**
 * 求数字字符串的千分位形式。
 * @param {String} str 
 * @returns {String} 12,222,333,321
 */
function qfw(str) {
    var re = /(\d+)(\d{3})/;
    while(re.test(str)) {
        str = str.replace(re, function($0, $1, $2){
            return $1 + "," + $2;
        })
    }
    return str;
}

/**
 * email 正则判断
 * @param {String} str 
 * @returns {Boolean}
 */
function emailJudge(str) {
    let re = /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/;
    return re.test(str);
}

/**
 * 身份证正则判断
 * @param {String} str 
 * @returns {Boolean}
 */
function idJudge(str) {
    let re = /[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/;
    return re.test(str);
}

/**
 * Ajax 请求封装。
 * Ajax 异步从服务器请求数据。
 * @param {Object} option 
 */
function ajax(option) {
    var method = option && option.method || "get";
    var url = option && option.url || "";
    var data = option && option.data || "";
    var SFn = option && option.SFn || function (){};
    var EFn = option && option.EFn || function (){};

    var xhr = new XMLHttpRequest();

    if(method.toLowerCase() == "get"){
        // 初始化一个请求
        // XMLHttpRequest.open(method, url, async, user, password);
        xhr.open(method, url + "?" + data, true);
        xhr.send();
    }else{
        xhr.open(method, url, true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }

    // onreadystatechange 指定一个函数（回调函数），当 readyState  的值发生改变时，就会调用这个函数；
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){  //完成
            if(xhr.status == 200){
                SFn(xhr.responseText);
            }else{
                EFn();
            }
        }
    }
}

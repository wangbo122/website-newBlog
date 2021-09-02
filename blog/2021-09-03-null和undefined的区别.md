---
title: null和undefined的区别
author: wang bo
author_title: 早睡早起
author_url: https://github.com/wangbo122
author_image_url: https://jstop1.com/blog/dvaeat.jpg
tags: ['null', 'undefined']
---

问题：null和undefined都为空，那么JavaScript为什么会有两个空的数据类型呢？

<!--truncate-->


------
答案：

null是一个表示"无"的对象，转为数值时为0；

undefined是一个表示"无"的原始值，转为数值时为NaN。

```
Number(undefined) // NaN
Number(null)      // 0
```

参考文献 [阮一峰-undefined与null的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html?_blank)
---
title: React Fiber
author: wang bo
author_title: 早睡早起
author_url: https://github.com/wangbo122
author_image_url: https://jstop1.com/blog/dvaeat.jpg
tags: [fiber]
---

提到fiber，就想到异步可中断更新，workInProgress、Effects list、updateQueue、performUnitOfWork等等...

<!--truncate-->

## 带着疑问看问题
一个思想，肯定是为了解决问题提出的方案。

react因为更新时没有像vue数据变化侦测机制，只能在深度优先遍历树结构下优化，优化到了浏览器渲染机制层面

从React15到React16有一个重大的更新，就是fiber，15的架构可以分成两层：Reconciler - Renderer

重构后的React16版本架构为 Scheduler - Reconciler - Renderer

那么问题来了，React15是有什么缺陷吗以至于重构？Scheduler又是什么？与fiber的实现和工作又有什么联系？

## React15

react的理念就是快速响应，而制约快速响应的两点是 CPU 和 IO

### 协调器Reconciler

老的架构中Reconciler（协调器）负责监听setState，forceUpdate，ReactDom.render等用户行为，来触发vdom树的更新

#### 每次更新时
1. Renconciler都会调用组件的render方法，将jsx转换成vdom
2. 将两次的vdom进行对比，找出此次更新中变换的vdom
3. 通知Renderer进行渲染

### 渲染器Renderer
React 最初只是服务于 DOM，但是这之后被改编成也能同时支持原生平台的 React Native。因此，在 React 内部机制中引入了“渲染器”这个概念。

渲染器用于管理一棵 React 树，使其根据底层平台进行不同的调用。

而渲染器Renderer是存在，也是虚拟dom的一个好处，就是跨平台友好。框架把jsx处理成vdom，再由不同的渲染器渲染到不同平台上

比如说我们最常见的ReactDom渲染器，还有ReactNative，ReactTest，ReactArt

### React15的问题
举个例子，当用户更新一个列表时，这个列表超级长，那么执行js的时间也就非常长，是一个Long Task，JS线程阻塞了GUI渲染线程，导致用户始终看不到页面更新。

那么有的小机灵鬼说了，我可不可以改成执行一半执行GUI渲染？
答案是不行的，用户怎么能看到一半数据新的，一半数据是旧的页面呢。

那么就得出结论了
  >React15的问题就是无法中断的同步更新，使用户持续的可交互时间变低。

相比较vue数据变化侦测机制下的细粒度更新更好。

## React16
React的架构为：Scheduler（调度器） - Reconciler - Renderer

### Scheduler（调度器）
我们需要中断Long Task去执行更高优先级的事情，在空闲时间进行回调。React实现了 `requestIdleCallback` polyfill

### Reconciler
React16中的Reconciler优化成可中断的递归
```
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```
在每次更新时都会判断是否有剩余时间shouldYield

  >整个Scheduler和Reconciler的工作都在内存中执行，只有当所有组件遍历完毕后，这棵fiber树才会挂载到rootFiber节点上，进行渲染。

## Fiber架构
一提到异步中断，就想起来Promise，Generator，async

React没有采用Generator实现协调器的原因：
1. 类似async，Generator也是传染性的，使用了Generator则上下文的其他函数也需要作出改变。这样心智负担比较重。
2. Generator执行的中间状态是上下文关联的。

### Fiber的含义
Fiber包含三层含义：

1. 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。

2. 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型、对应的DOM节点等信息。

3. 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的更新，插入，删除等工作。

### Fiber的工作原理
提到Fiber就会想到双缓存结构，当只有一棵树时，就是组件在创建；有两棵树时，组件就是在更新。

呈现到用户眼中的Fiber树叫current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

这两棵树通过alternate属性相互连接，当workInProgress Fiber树构建完成交给Renderer渲染时，rootFiber指针指向workInProgress Fiber树，此时这棵树就变成了workInProgress Fiber树。另一棵树作为workInProgress Fiber树此时正在内存中等待下一个更新。

### Fiber的具体结构
```
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```
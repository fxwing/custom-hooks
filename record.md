#### 获取函数组件的ref实例


1. ```jsx
 // 直接给子组件传ref xxRef  获取子组件的dom
    const testEffectDom = useRef(null);
   <Child  propRef={testEffectDom}></Child>
```
2.
#### 获取函数组件的 ref 实例

1. ```jsx
   // 直接给子组件传ref xxRef  获取子组件的dom
   const testEffectDom = useRef(null);
   <Child propRef={testEffectDom}></Child>;
   ```

```
2.  styled-components
   1.  & 代表本组件
   2. && 优先级最高
   3. 支持像less一样嵌套
   4. attrs() 支持({}),(props)=>({[key]:props.key}) 配置属性

```

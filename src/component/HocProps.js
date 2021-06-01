import React from "react";
// 属性代理  修改更新props  修改组件的props
// 高阶组件的使用 当函数使用
function withVisible(WrapComponent, visible = true) {
  return (props) => {
    if (!visible) return null;
    return <WrapComponent {...props}></WrapComponent>;
  };
}

class Example extends React.PureComponent {
  render() {
    return <>实例组件</>;
  }
}

//  相当于一闭包
export default withVisible(Example, true);

/// 高阶组件实现方式

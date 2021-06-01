// 反向继承  hoc的使用
// 渲染劫持
import React from "react";
function withHoc(WrapComponent) {
  //   这里都要是类组建
  return class extends WrapComponent {
    componentDidMount() {
      console.log("didMount");
    }

    render() {
      console.log(this.state,this.props);
      this.state={...this.state,count:21}
      //  react对象
      const componentTree = super.render();
      const newProps = Object.assign({},componentTree.props, { age: 111 });
      // console.log(componentTree,newProps);
      // return React.createElement('div', newProps, componentTree.props.children);
      return <>{React.cloneElement(React.cloneElement(
        componentTree,
        newProps,
        componentTree.props.children,
      ),{count:111},)}</>;
    }
  };
}

// const Example = () => {
//   return <>222</>;
// };

class Example extends React.Component {
  static displayName = "displayName";
  state = { count: 0 };
  componentDidMount() {
    console.log("这里执行吗"); /// 这里不执行
  }
  render() {
    return (
      <div name={3}>
        count:{this.state.count}
        {/* <span>111</span> */}
      </div>
    );
  }
}


const TestArrowComponentDisplayName =()=>{
  const [list,setList] = React.useState({name:2})
  return <>{333}</>
}
TestArrowComponentDisplayName.displayName="hocExtend页面的当前页组件"


export default TestArrowComponentDisplayName;

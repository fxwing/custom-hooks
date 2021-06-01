//  实时更新

//   子组件实时更新
//   给子组件传递ref的回调 子组件修改ref的值  父组件也会跟着变
import React, {
  Component,
  useRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
  useCallback,
  PureComponent,
  useEffect,
  useLayoutEffect,
  // useEffect
} from "react";

// function Father() {
//   const [value, setValue] = useState("");
//   // ref 传递一个函数
//   // 子组件改变ref的值  可以实时监控到
//   const childRef = useCallback((node) => {
//     console.log(node); //{vaule:''}

//     if (node !== null) {
//       setValue(node.value);
//     }
//   }, []);
//   const getChildValue = useCallback(() => {
//    // setValue(childRef.current.value);
//   }, []);

//   return (
//     <>
//       <div>
//         父组件:<input value={value}></input>
//       </div>
//       <div>
//         子组件：<SonWithRef ref={childRef}></SonWithRef>
//       </div>
//       <div>
//         <button onClick={getChildValue}>获取子组件的值</button>
//       </div>
//     </>
//   );
// }

class Father extends PureComponent {
  chidRef = null;
  state = {
    value: "",
  };
  getChildValue = () => {};
  setValue = (ref) => {
    this.setState({
      value: ref?.value,
    });
  };
  render() {
    return (
      <>
        <div>
          父组件:<input value={this.state.value}></input>
        </div>
        <div>
          子组件：<SonWithRef ref={this.setValue}></SonWithRef>
        </div>
        <div>
          <button onClick={this.getChildValue}>获取子组件的值</button>
        </div>
      </>
    );
  }
}

function Son(props, ref) {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log("effect");
  }, []);
  //  可以理解为修改ref
  useImperativeHandle(ref, () => {
    return { value };
  });
  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  console.log("render");
  //Promise.resolve(2).then((res) => console.log(res));

  useLayoutEffect(() => {
    console.log("layout");

    return () => {};
  }, [value]);
  // 这两个十是一样的
  // const element = React.createElement('div',{name:'1'},'子节点222');
  const  element = <div name="1">子节点222<div>333</div></div>



  console.log(element);

  return (
    <>
      {element}
      <input value={value} onChange={onChangeValue}></input>
    </>
  );
}

const SonWithRef = memo(forwardRef(Son));

export default Father;

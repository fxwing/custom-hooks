/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDom from "react-dom";
import TestEffect from "./component/testEffect";
// import Father from "./component/refRealTime";
import Previous from "./component/previous";
import StateCallback from "./component/stateCallback";
import Position from "./component/position";
// import Visible  from './component/HocProps'
import Example from "./component/HocExtends";
// import UseReducer from './component/useReducer'
import Keeplive from "./page/keepAlive/index";
import { CompountComponent, ControlProps } from "./page/react-patterns";
import NextContext from "./component/NextContext";
import TestModel from "./component/TestModel";

function App() {
  const quene = [1, 2];
  const [, forceUpdate] = useState();
  const testDom = useRef(null);
  const childRef = useRef(null);
  useEffect(() => {
    console.log(childRef.current);

    let timer = setInterval(() => {
      // forceUpdate(""); // 更新状态会进行一个浅比较
    }, 500);
    return () => {
      console.log("组件卸载了");
      clearTimeout(timer);
    };
  }, []);
  // 改变重新渲染
  const bindChangeAppRender = useCallback(() => forceUpdate(), []); // 更新组建状态 useEffect  return中的回调函数不会触发
  // 卸载子组件的某些节点
  const unMountChildNode = useCallback(() => {}, []);
  // 卸载组件上的某一个dom
  const unMountCurrSomeNode = useCallback(() => {
    //ReactDom.unmountComponentAtNode(testDom.current); // 这样卸载是失败的
    // console.log(document.querySelector("#testDom") === testDom.current); // true  这两个dom是一样的
    //  render上的才可以卸载
    ReactDom.unmountComponentAtNode(document.querySelector("#testDom")); //失败
  }, []);

  const mountCurrSomeNode = useCallback(() => {
    ReactDom.render(
      " 这个是当前组件的某一个dom 节点",
      document.querySelector("#testDom")
    );
  }, []);

  return (
    // <>
    //   <button onClick={bindChangeAppRender}> change App render</button>
    //   <hr></hr>
    //   <button onClick={mountCurrSomeNode}>挂载当前组件某一个节点</button>
    //   <button onClick={unMountCurrSomeNode}>卸载当前组件某一个节点</button>
    //   <div ref={testDom} id="testDom">
    //     {/* 这个是当前组件的某一个dom 节点 */}
    //   </div>
    //   <hr></hr>
    //   <button onClick={unMountChildNode}>卸载子组件节点</button>
    //   {/* 这样是能传递给子组件的ref的  获取子组件的某个dom */}
    //   <TestEffect list={quene} ref={childRef}></TestEffect>
    // </>
    <>
      {/* <Father></Father> */}
      {/* <Previous></Previous> */}
      {/* <StateCallback></StateCallback> */}
      {/* <Position></Position> */}
      {/* <Visible visible="true"></Visible> */}
      {/* <Example></Example> */}
      {/* <UseReducer count={10}></UseReducer> */}
      {/* <Keeplive></Keeplive> */}
      {/* <CompountComponent></CompountComponent> */}
      {/* <ControlProps></ControlProps> */}
      {/* {NextContext} */}
      <TestModel></TestModel>
    </>
  );
}

// ref 则不允许直接使用props
export default App;

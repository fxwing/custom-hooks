import React, { useRef, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import CacheContext from "./CacheContext";
import * as cacheTypes from "./cache-types";

//  返回一个空的容器
export default function withKeepalive(
  OldComponent,
  { cacheId = uuidv4(), scroll }
) {
  return (props) => {
    const domRef = useRef(null);
    const { cacheStates, dispatch } = useContext(CacheContext);
    console.log(1, cacheStates);
    // 修改scroll
    useEffect(() => {
      const cacheState = cacheStates[cacheId];
      const scrolls = cacheState?.scroll;
      //  修改的redux
      const onSrcoll = (event) => {
        const target = event.target;
        scrolls[target] = target.scrollTop;
      };
      if (scroll && cacheState) {
        domRef.current?.addEventListener("scroll", onSrcoll, true); //捕获阶段
      }
      return () => {
        domRef.current?.removeEventListener("scroll", onSrcoll);
      };
    }, [cacheStates]);

    useEffect(() => {
      const cacheState = cacheStates[cacheId];
      const doms = cacheState?.doms;
      // 这个时候说明已经有真实dom  且状态不为销毁
      if (cacheState && doms && cacheState.status !== cacheTypes.DESTROY) {
        // 将子节点加到当前dom中
        doms.forEach((dom) => domRef.current.appendChild(dom));
        if (scroll) {
          doms.forEach((dom) => {
            if (cacheState.scroll[dom]) {
              dom.scrollTop = cacheState.scroll[dom];
            }
          });
        }
      } else {
        const reactElement = (
          <OldComponent {...props} dispatch={dispatch}></OldComponent>
        );
        if (cacheState) {
          // // 如果状态为销毁 需要将真实dom去掉并重新创建
          if (cacheState?.status === cacheTypes.DESTROY) {
            doms.forEach((dom) => dom.parentNode.removeChild(dom));
            dispatch({
              type: cacheTypes.CREATE,
              payload: { cacheId, reactElement },
            });
          }
        } else {
          dispatch({
            type: cacheTypes.CREATE,
            payload: { cacheId, reactElement },
          });
        }
      }
    }, [cacheStates, dispatch, props]);
    // 先走的render  再触发  create
    //   实际渲染都是在这个组件
    return <div id={`react-keepalive${cacheId}`} ref={domRef}></div>;
  };
}

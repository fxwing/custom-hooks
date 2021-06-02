import React, { useReducer, useCallback } from "react";
import CacheContext from "./CacheContext";
import cacheReducer from "./cacheReducer";
import * as cacheTypes from "./cache-types";
function KeepaliveProvider(props) {
  const [cacheStates, dispatch] = useReducer(cacheReducer, {});

  return (
    <CacheContext.Provider value={{ cacheStates, dispatch }}>
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== cacheTypes.DESTROY)
        .map(({ cacheId, reactElement }) => {
          console.log(reactElement);
          return (
            <div
              key={cacheId}
              id={`cache-${cacheId}`}
              ref={(divDom) => {
                // 这个回调函数是异步 渲染到页面之后会执行回调函数
                const cacheState = cacheStates[cacheId];
                // 如果没有真实dom要缓存真实dom
                if (divDom && !cacheState.doms) {
                  const doms = Array.from(divDom.childNodes);
                  dispatch({
                    type: cacheTypes.CREATED,
                    payload: { cacheId, doms },
                  });
                }
              }}
            >
              {reactElement}
              {reactElement}
            </div>
          );
        })}
    </CacheContext.Provider>
  );
}
KeepaliveProvider.displayName = "keepalive的provider";

export default KeepaliveProvider;

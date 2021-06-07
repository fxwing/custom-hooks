//   核心库
import React, { useContext, useReducer, useEffect, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";

/**
 *
 *  生成一个provider
 * @param {*} {allModel,context}
 * @return  <Context.Provider value={model.state,dispatch}>{children}</Context.Provider>
 */
export function generateProvider({ allModel, context }) {
  const reducer = generateReducer({ allModel });
  return (props) => {
    const [state, dispatch] = useReducer(reducer, allModel, initallModel);
    const { children } = props;
    return (
      <context.Provider value={{ state, dispatch }}>
        {children}
      </context.Provider>
    );
  };
}

// 先生成reducer  在获取到state和dispatch
//  注意:reducer中的第二个参数支持自定义不一定必须带type  dispatch触发这个对象返回一个新的state
export function generateReducer({ allModel }) {
  return (allState, options) => {
    const { modelName, methodName, dispatch, payload } = options;
    const modelReducer = allModel[modelName].reducers?.[methodName];
    const oldModelState = allModel[modelName];
    const newModelState = modelReducer({
      state: oldModelState,
      dispatch,
      payload,
    });
    return cloneDeep({
      ...allState,
      [modelName]: newModelState,
    });
  };
}
// 初始化allModel中的state
export function initallModel(allModel) {
  let state = {};
  for (let key in allModel) {
    state[key] = allModel[key].state;
  }
  return state;
}

/**
 *
 *
 * @param {*} {allModel,context}
 * 这里封装 重写下dispatch
 * @return const {state,dispatch} = useModel()
 */
export function generateUseModel({ allModel, context }) {
  return function () {
    const { state, dispatch } = useContext(context);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const stateRef = useRef(state);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      stateRef.current = state;
    }, [state]);
    function getState() {
      return { ...stateRef.current };
    }
    //  派发loading
    function setLoading(type, flag) {
      dispatch({
        modelName: "loading",
        methodName: "setLoading",
        dispatch: thunkDispatch,
        payload: {
          type,
          loading: flag,
        },
      });
    }
    function getLoading(type) {
      return state.loading[type] || false;
    }

    // 改造下dispatch
    // dispatch('global/save',payload={})
    function thunkDispatch(type, payload) {
      const [modelName, methodName] = type.split("/");
      const action = allModel[modelName].actions?.[methodName];
      if (action) {
        setLoading(type, true);
        // 异步
        action({
          dispatch: thunkDispatch,
          getState, // 这个是全部的state
          payload,
        }).finally(() => {
          setLoading(type, false);
        });
      } else {
        // 同步
        dispatch({
          modelName,
          methodName,
          dispatch: thunkDispatch,
          payload,
        });
      }
    }
    return { state, dispatch: thunkDispatch, getLoading };
  };
}

// 添加一个内置的loadingmodel  payload{type,loading}
export function generateLoadingModel() {
  return {
    name: "loading",
    state: {},
    actions: {},
    reducers: {
      setLoading({ state, dispatch, payload }) {
        // 这个参数的state是当前model中的state
        const { type, loading } = payload;
        const newState = { ...state };
        if (loading) {
          newState[type] = true;
        } else {
          delete newState[type];
        }
        return newState;
      },
    },
  };
}

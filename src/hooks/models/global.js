//   global 的modal

const initialState = {
  isToggle: false,
};


// dva  封装了dispatch  判断type是否在actions中在的话执行这个异步函数
// 不在的话  直接执行reducers中  修改全局state
// 这个dispatch  就是thunkDispatch
// model 模型
// modal 模式
const model = {
  name: "global",
  state: initialState,
  actions: {
    async toggle({ dispatch, getState, payload }) {
      await sleep();
      const state = getState().global;
      dispatch("global/disPatchSave", { isToggle: !state.isToggle });
    },
    async disPatchSave({ getState, payload, dispatch }) {
      dispatch("global/save", payload);
    },
  },
  reducers: {
    // 这个state是上次的state
    save({ dispatch, state, payload }) {
      return { ...state, ...payload };
    },
  },
};

function sleep(delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}

export default model;

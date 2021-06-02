import * as cacheTypes from "./cache-types";

// state
// {
//   [cacheId]:{
//     cahceId,
//     status,
//     doms, // 真实的dom
//     reactElement,//虚拟dom
//     scroll:{}// key 是滚动的dom  value：滚动的位置
//   }
// }
export default function cacheReducer(cacheState, actions) {
  const payload = actions.payload;
  const cacheId = payload.cacheId;
  switch (actions.type) {
    // 创建  缓存虚拟dom
    case cacheTypes.CREATE:
      return {
        ...cacheState,
        [cacheId]: {
          cacheId,
          status: cacheTypes.CREATE,
          doms: undefined, // 真实的dom
          reactElement: payload.reactElement, //虚拟dom
          scroll: {}, // key 是滚动的dom  value：滚动的位置
        },
      };
    //  代孕成功 缓存真实的dom
    case cacheTypes.CREATED:
      return {
        ...cacheState,
        [cacheId]: {
          ...cacheState[cacheId],
          status: cacheTypes.CREATED,
          doms: payload.doms, // 真实的dom
        },
      };
    // 取消缓存
    case cacheTypes.DESTROY:
      return {
        ...cacheState,
        [cacheId]: {
          ...cacheState[cacheId],
          status: cacheTypes.DESTROY
        },
      };

    default:
      return { ...cacheState };
  }
}

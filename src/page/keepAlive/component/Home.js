import React from 'react'
import * as cacheTypes from '../KeepAlive-react-component/cache-types'

export default function Home({dispatch}) {
  return (
    <>
      <button onClick={dispatch.bind(null,({type:cacheTypes.DESTROY,payload:{cacheId:'add'}}))}>重置UserAdd</button>
      <button onClick={dispatch.bind(null,({type:cacheTypes.DESTROY,payload:{cacheId:'userList'}}))}>重置UserList</button>
    </>
  );
}

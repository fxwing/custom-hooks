import React from "react";

export default function UserList() {
  const list = new Array(100).fill(0);
  return (
    <div style={{overflow:'scroll',height:'300px'}}>
      {list.map((item, index) => {
        return <p key={index}>{index}</p>;
      })}
    </div>
  );
}

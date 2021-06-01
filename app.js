// express  启动服务
const express = require("express");
// cors  是控制跨域的总称  跨域资源共享
// cross origin resource  sharing
// 在响应的报文  header头中
// 控制的是 access-control-allow-origin:* 或者请求的当前的域名
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/app/users", (req, res) => {
  const currentPage = ~~req.query.currentPage; // 2
  const pageSize = ~~req.query.pageSize; // 5
  let total = 26;
  const list = [];
  const offset = (currentPage - 1) * pageSize;// 10
  for (let i = offset; i < offset + pageSize; i++) {
    list.push({ id: i + 1, name: "name" + (i + 1) });
  }
  res.json({
    currentPage,
    pageSize,
    list,
    totalPage: Math.ceil(total / pageSize),
  });
});

function start(port) {
  app.listen(port, () => {
    console.log(`服务器在端口${port}已启动`);
  });
}
start(8000);

const express = require('express');
const request = require('request');
const cors = require('cors'); // 引入 CORS 中间件
require('dotenv').config();

const app = express();

app.use(cors()); // 使用 CORS 中间件

// 设置代理路由
app.post('/proxy', (req, res) => {
  const url = process.env.API_DATA;
  req.pipe(request.post(url)).pipe(res);
});
app.post('/proxy2', (req, res) => {
  const url = process.env.APT_USER;
  req.pipe(request.post(url)).pipe(res);
});
// 启动服务器
app.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});

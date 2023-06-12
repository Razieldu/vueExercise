const express = require('express');
const request = require('request');
const cors = require('cors'); // 引入 CORS 中间件

const app = express();

app.use(cors()); // 使用 CORS 中间件

// 设置代理路由
app.post('/proxy', (req, res) => {
  const url = 'http://10.0.10.131/CRM_WebAPI/Marking/GET_MemberData';
  req.pipe(request.post(url)).pipe(res);
});
app.post('/proxy2', (req, res) => {
  const url = 'http://10.0.10.131/CRM_WebAPI/Marking/Login?id=2&password=2';
  req.pipe(request.post(url)).pipe(res);
});
// 启动服务器
app.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});

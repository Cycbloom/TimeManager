const express = require('express');
const app = express();
const notebookRouter = require('./router/notebookRouter');
const pool = require('./config/postgres');

// 解析 JSON 数据的中间件
app.use(express.json());

// 连接数据库
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the database');
        release();
    }
});

app.use(notebookRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
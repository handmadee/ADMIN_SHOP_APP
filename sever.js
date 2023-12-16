
const express = require('express');
// Sử dụng Morgan để ghi log xem tốc độ request 
const morgan = require('morgan');
// Sử dụng Helmet để bảo vệ ứng dụng ngăn chặn trang thứ 3 đọc cookie 
// Lệnh để truy cập curl http://localhost:3001 --include
const helmet = require('helmet');
// nén file để giảm gánh nặng tốc độ tải qua băng thông node js 
// vào network đẻ xem tốc độ băng thông 
const compression = require('compression');
// Khởi tạo và connect tới CSDL và Liên kết các table được tạo lại với nhau 
const {sequelize} = require('./models/index');
const { rootRouter } = require('./routers');
const cors = require('cors')
const path = require('path');
const PORT = 3006;
const app = express();

// STATIC FILE 
// tìm đường dẫn tới thư mục public 
// __dirname là thư mục hiện tại  
const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));


// Init middlewares 
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
// Mục đichs cần phải sử dụng thằng này là khi gửi 1 dữ liệu dữ liệu thường được gửi dưới dạng JSON 
// Và để cho express hiểu được dữ liệu được gửi lên thì nó thực hiện parse JSON từ phần thân 
app.use(express.json());
app.use(cors());
app.use('/api/v1', rootRouter);



// init router
app.get('/', (req, res) => {
    res.status(200).send('')
});
// Lắng nghe event
app.listen(PORT, async () => {
    console.log(`app listening http://localhost:${PORT}`);
    // Check Connect  to SQL
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});


// NOTE
// Seeders Tạo 1 bảng sẵn để backup dữ liệu 
// Migrations là quản lý và thực hiện các cấu trúc thay đổi CSDL clear 

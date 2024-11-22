import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';

import router from './routes/router.js';
try {
	mongoose.connect('mongodb://localhost:27017/films');
	console.log('Connected to MongoDb server');
} catch (error) {
	console.log(error, 'Error connecting to MongoDb server');
}
const app = express();
app.use(urlencoded({ extended: false }));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './src/views');
app.use(express.static('./src/public'));
app.use(cookieParser());
app.use(authMiddleware);

app.use(router);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

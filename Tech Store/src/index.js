import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import router from './routers/routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const dataBase = 'Devices';

try {
	await mongoose.connect(`mongodb://localhost:27017/${dataBase}`);
	console.log('Connected to MongoDB');
} catch (error) {
	console.error('Error connecting to MongoDB' + error.message);
}

const app = express();
app.use(express.urlencoded({ extended: false }));
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(authMiddleware);
app.use(router);

app.listen(3000, () => console.log('listening on port http://localhost:3000'));
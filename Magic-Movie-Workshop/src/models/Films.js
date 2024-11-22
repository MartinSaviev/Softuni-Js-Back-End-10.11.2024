import { Schema, Types, model } from 'mongoose';

const filmSchema = new Schema({
	title: String,
	imageUrl: String,
	director: String,
	genre: String,
	year: Number,
	description: String,
	rating: String,
	owner:{
		type:Types.ObjectId,
		ref: 'User',
	}
	
});

const Films = model('Film',filmSchema);

export default Films;

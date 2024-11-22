import { Schema, model } from 'mongoose';

const castSchema = new Schema({
	name: String,
	role: String,
	age: Number,
	born: String,
	imageUrl: String,
});

const Casts = model('Casts', castSchema);

export default Casts;

import { Schema, model, Types } from 'mongoose';

const mainSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		validate: /^https?:\/\//,
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: 2,
	},
	genre: {
		type: String,
		required: [true, 'Genre is required'],
	},

	platform: {
		type: String,
		required: [true, 'Category is required'],
		enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
	},
	boughtBy: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required'],
		minLength: 3,
	},
});

const Game = model('Game', mainSchema);

export default Game;

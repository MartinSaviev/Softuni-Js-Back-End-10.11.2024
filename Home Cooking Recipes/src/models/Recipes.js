import { Schema, model, Types } from 'mongoose';

const mainSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minLength: 2,
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minLength: 10,
	},
	ingredients: {
		type: String,
		required: [true, 'Ingredients is required'],
		min: 10,
		max: 100,
	},

	instructions: {
		type: String,
		required: [true, 'Instructions is required'],
		min: 10,
		max: 200,
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		validate: /^https?:\/\//,
	},

	recommendList: [
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

const Recipes = model('DataBase', mainSchema);

export default Recipes;

import { Schema, model, Types } from 'mongoose';

const mainSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	location: {
		type: String,
		required: [true, 'Location is required'],
	},

	category: {
		type: String,
		required: [true, 'Category is required'],
	},
	color: {
		type: String,
		required: [true, 'Color is required'],
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		validate: /^https?:\/\//,
	},
	formula: {
		type: String,
		required: [true, 'Formula is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	owner: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Owner is required'],
	},
	likedList: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
});

const Stones = model('Stones', mainSchema);

export default Stones;

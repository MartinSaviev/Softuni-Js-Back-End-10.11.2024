import { Schema, model, Types } from 'mongoose';

const mainSchema = new Schema({
	brand: {
		type: String,
		required: [true, 'Title is required'],
		minLength: 2,
	},
	model: {
		type: String,
		required: [true, 'Ingredients is required'],
		minLength: 5,
	},

	hardDisk: {
		type: String,
		required: [true, 'Instructions is required'],
		minLength: 5,
	},
	screenSize: {
		type: String,
		required: [true, 'Description is required'],
		minLength: 1,
	},
	ram: {
		type: String,
		required: [true, 'Image is required'],
		minLength: 2,
	},
	operationSystem: {
		type: String,
		required: [true, 'Operating System is required'],
		minLength: 5,
		maxLength: 20,
	},
	cpu: {
		type: String,
		required: [true, 'CPU is required'],
		minLength: 10,
		maxLength: 50,
	},
	gpu: {
		type: String,
		required: [true, 'GPU is required'],
		minLength: 10,
		maxLength: 50,
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [0, 'Price must be a positive number'],
	},
	color: {
		type: String,
		required: [true, 'Color is required'],
		minLength: 2,
		maxLength: 10,
	},
	weight: {
		type: String,
		required: [true, 'Weight is required'],
		minLength: 1,
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		validate: /^https?:\/\//,
	},

	preferredList: [
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

const Stones = model('Devices', mainSchema);

export default Stones;

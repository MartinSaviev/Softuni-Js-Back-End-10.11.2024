import { Schema, model, Types } from 'mongoose';

const mainSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		minlength: 2,
	},
	age: {
		type: Number,
		validate: {
			validator: function (v) {
				return typeof v === 'number' && !isNaN(v) && v > 0;
			},
		},
	},

	solarSystem: {
		type: String,
		required: [true, 'Solar System is required'],
		minlength: 2,
	},
	type: {
        type: String,
        enum: ['Inner', 'Outer', 'Dwarf'],
        required: [true, 'Type is required'],
    },
	moons: {
		type: Number,
		required: [true, 'Moons is required'],
		validate: {
			validator: function (v) {
				return typeof v === 'number' && !isNaN(v) && v > 0;
			},
		},
	},
	size:{
		type: Number,
		required: [true, 'Size is required'],
		validate: {
			validator: function (v) {
				return typeof v === 'number' && !isNaN(v) && v > 0;
			},
		},
	},
	rings: {
        type: String,
        enum: ['Yes', 'No'],
        required: [true, 'Rings option is required'],
    },
	description: {
		type: String,
		required: [true, 'Description is required'],
		minlength: 10,
		maxlength: 100,
		
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
		validate: /^https?:\/\//,
	},
	likedList: [
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

const Planets = model('Planets', mainSchema);

export default Planets;

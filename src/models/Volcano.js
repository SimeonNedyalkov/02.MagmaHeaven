const { Schema, model, Types } = require('mongoose');

const volcanoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    elevation: {
        type: Number,
        required: [true, 'Category is required'],
    },
    lastEruption: {
        type: Number,
        required: [true, 'Color is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    
    typeVolcano: {
        type: String,
        enum:['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        required: [true, 'Formula is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    voteList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Volcano = model('Volcano', volcanoSchema);

module.exports = {
    Volcano
};
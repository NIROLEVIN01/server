const mongoose = require('mongoose')
const schema = mongoose.Schema

const ChildUserSchema = new schema ({

    phoneNumber: {
        type: String,
        required: true
    },

    fisrtName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    
    parents: {
        type: Array,
        required: true
    },

    coordinate: {
        type: Array,
        required: false
    }

}) 

const ChildUser = mongoose.model('childuser', ChildUserSchema)
module.exports = ChildUser;
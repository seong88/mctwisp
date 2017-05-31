
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
//currently on edit
var productSchema = new mongoose.Schema({
    type: String,
    data: {
        content: String,
        title: String,
        added_on: String,
        last_edit: String
    },
    user: String,
    timeArr: [{start: Number,
        end: Number,
        sum: Number
    }
    ]
    /*DEBUG*/
});

// Return model
module.exports = restful.model('Products', productSchema);

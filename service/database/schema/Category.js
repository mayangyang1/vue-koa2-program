const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    ID: {unique: true, type: String},
    MALL_CATEGORY_NAME: String,
    IMAGE: String,
    TYPE: Number,
    SORT: Number,
    COMMENTS: String
},{
    collection: 'Category'
})

mongoose.model('Category', categorySchema);
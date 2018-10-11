const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySubSchema = new Schema({
    ID: String,
    MALL_CATEGORY_ID: String,
    MALL_SUB_NAME: String,
    COMMENTS: String,
    SORT: Number
},{
    collection: 'CategorySub'
})

mongoose.model('CategorySub', categorySubSchema);
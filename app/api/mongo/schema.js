/* 
 * 创建schema 
*/

const {Schema} = require('mongoose');

//创建博客分类
const categorySchema = new Schema({
   name: String,
   id: String
});

//创建博客的数据存储 schema
const blogSchema = new Schema({
  title:  String,
  content:   String, //html
  rawContent: String, //markdown
  category: categorySchema,//分类
  date: String
},{
    _id:false, //===>_id为false 告诉mongoose不要去操作_id
    //http://mongoosejs.com/docs/guide.html#strict
    strict: false
});

module.exports = {
  blogSchema,
  categorySchema
}



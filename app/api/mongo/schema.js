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
  date: { type: String, default: ()=>{
  	return new Date().toLocaleString()
  }}	
},{
    _id:false, //===>_id为false 告诉mongoose
    //http://mongoosejs.com/docs/guide.html#strict
    strict: false
});

module.exports = {
  blogSchema,
  categorySchema
}



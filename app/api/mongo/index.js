/*
* 创建model
*/

const mongoose = require('mongoose');

const { blogSchema,categorySchema } = require('./schema');

//第一个参数是collection的名字
const BlogModel = mongoose.model('Blog', blogSchema);
const CategoryModel = mongoose.model('Category',categorySchema);

const $_saveBlog = blog => {
    return BlogModel.findOneAndUpdate({title:blog.title},blog,{
        upsert:true,
		new: true
     }).exec()
       .then(_blog=>{
		return {
			status:1,
			data:_blog
		}
	})
}

const $_saveCategory = category => {
    console.log(category);
    return CategoryModel.findOneAndUpdate({
		name: category.name
	},category,{
		//update and insert 
        upsert:true,
        //无论如何都返回数据
        new: true
	})
	.then(_category=>{
        console.log(_category);
		return {
			status:1,
			data:_category
		}
	})
}

module.exports = {
    $_saveBlog,
	$_saveCategory 
}
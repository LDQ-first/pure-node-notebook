/*
* 创建model
*/

const mongoose = require('mongoose');

const { blogSchema,categorySchema } = require('./schema');

//第一个参数是collection的名字
const BlogModel = mongoose.model('Blog', blogSchema);
const CategoryModel = mongoose.model('Category',categorySchema);

exports.$_saveBlog = blog => {
	//upsert ===> update + insert
	let condition = {title: blog.title};
	blog.date = new Date().toLocaleString();
    return BlogModel.findOneAndUpdate(condition, blog, {
        upsert:true,
		new: true
     }).then(_blog=>{
		return {
			status:1,
			data:_blog
		}
	})
}

exports.$_saveCategory = category => {
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

exports.$_getCategoryLlist = query => {
	//collection + document的样子
	return CategoryModel.find(query).exec().then(categoryList => {
		return {
			status: 1,
			data: categoryList || []
		}
	})
}

exports.$_getBlogDetail = query => {
	let condition = {
		_id: mongoose.Types.ObjectId(query.id)
	}
	//_id ==> objectId
	return BlogModel.findOne(condition)
		.then(blog => {
			return {
				status: 1,
				data: blog
			}
		})
}

exports.$_getBlogList = query => {
	return BlogModel.find(query).exec()
		.then(blogList => {
			return {
				status: 1,
				data: blogList
			}
		})
}

exports.$_deleteBlog = query => {
	let condition = {
		_id: mongoose.Types.ObjectId(query.id)
	}
	return BlogModel.remove(condition).exec()
		.then(blog => {
			return {
				status: 1,
				data: '删除博客成功'
			}
		})
}
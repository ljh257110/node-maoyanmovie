var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
const async = require('async');


//创建mongodb客户端
var MongoClient = mongodb.MongoClient;
//创建连接数据库地址（user库）
var DB_CONN_STR = 'mongodb://localhost:27017/user';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/img', function(req, res, next) {
  res.render('123', { title: 'img' });
});
//显示注册页面
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});
//显示登录页面
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
/*router.get('/comment', function(req, res, next) {
  res.render('comment', { title: 'Comment' });
});*/
// 列表
router.get('/comment', function(req, res,next) {
	console.log('bbb');
	var pageNo =  req.query['pageNo'] || 1; //当前第x页
	  var pageSize = 5; //每页显示5条
	  var totalPage = 0; //共x页
	  var count = 0; //共x条
    function findData(db){
		var conn = db.collection('comment');
		async.series([
	      function(callback) {
	        conn.find().toArray(function(err, results){
	        	 count = results.length;
		          totalPage = Math.ceil(count/5);

		          pageNo = pageNo>=totalPage ? totalPage : pageNo;
		          pageNo = pageNo<1 ? 1 : pageNo;
	        	if(err){
	        		console.log(err);
	        		return;
	        	}else{
	        		callback(null,"");
	        		// db.close();
	        	}
	          
	        })
	        
	      },
	      function(callback) {
	        //skip:从第几条开始显示数据, limit:显示多少条数据
	        conn.find({}).sort({_id:-1}).skip((pageNo-1)*5).limit(pageSize).toArray(function(err, results){
	        	if(err){
	        		console.log(err);
	        		return;
	        	}else{
	        		callback(null,results);
	        		// db.close();
	        	}
	          
	        })

	         /* callback(null, "two");*/
	        
	      }
	    ], function(err, results) {
	    	console.log(results);
	     	res.render('comment',
			      {
			         resData: results[1],
			        count: count,
			        totalPage: totalPage,
			        pageNo: pageNo,
			        phone:req.session.phone
			      })
				db.close();
	    })
		/*conn.find().toArray(function(err, results){
			if(err){
				console.log(err);
				return;
			}else{
				console.log(results);	
				// res.send(results);
				res.render('comment',
			      {
			        resData: results
			        
			      })
				db.close();
			
			}
				
		})*/
		
	}
	  MongoClient.connect(DB_CONN_STR, function(err, db) {
	  	// console.log("数");
	    findData(db);
	  })


})
module.exports = router;

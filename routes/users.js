var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
const async = require('async');
//创建mongodb客户端
var MongoClient = mongodb.MongoClient;
//创建连接数据库地址（user库）
var DB_CONN_STR = 'mongodb://localhost:27017/user';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册
router.all("/register",function(req,res){
	console.log('aaa')
	var phone = req.body['phone'];
	var str = phone.substring(0, 3) + '****' + phone.substring(7);
	var password = req.body['password'];
	var data = [{phone: phone, password: password}];
	// var val = {phone: phone};
	//操作数据库
	function insertData(db){
		var conn = db.collection('login');
		conn.insert(data,function(err, results){
			if(err){
				console.log(err);
				console.log(2);
				return;
			}else{
				req.session.phone = str;
				res.send({phone: phone, password: password,username:str});
				// res.redirect('/');
				// console.log(1);
				db.close();
			}
		})
	}
	//操作数据库
	/*function findData(db){
		var conn = db.collection('login');
		conn.find(val,{phone:1}).toArray(function(err, results){
			if(results.length > 0){
				// res.redirect('/');
				res.send(val);
				return;
			}else{
				res.redirect('/login');
			}
		})
	}*/
	//通过mongoClinet连接数据库
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log("数据库连接成功");
			
			insertData(db);
			// findData(db);
			
		}
	})

})
//注册验证是否注册
router.all("/login1",function(req,res){
	console.log('ccc');
	var phone = req.body['phone'];
	
	var val = {phone: phone};
	console.log(val);
	//操作数据库
	function findData(db){
		var conn = db.collection('login');
		conn.find(val,{phone:1}).toArray(function(err, results){
			if(results.length > 0){
				// res.redirect('/');
				res.send(val);
				return;
			}else{
				res.redirect('/login');
			}
		})
	}

	//通过mongoClinet连接数据库
	if(phone && password){
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if(err){
				console.log(err);
				return;
			}else{
				console.log("数据库连接成功");
				findData(db);
				
			}
		})
	}else{
		res.redirect('/login');
	}
	

})


//评论
router.all("/comment",function(req,res){
	console.log('aaa')
	var username = req.body['username'];
	var content = req.body['content'];
	var time = req.body['time'];
	var img = req.body['img'];
	var approve = req.body['approve'];
	
	var data = [{username:username,content:content,time:time,img:img}];
	
	//操作数据库
	function insertData(db){
		var conn = db.collection('comment');
		conn.insert(data,function(err, results){
			if(err){
				console.log(err);
				console.log(2);
				return;
			}else{
				res.send(data);
				// res.redirect('/');
				// console.log(1);
				db.close();
			}
		})
	}

	//通过mongoClinet连接数据库
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log("数据库连接成功");
		
			insertData(db);
			
		}
	})

})



//登录
router.all("/login",function(req,res){
	console.log('bbb');
	var phone = req.body['phone'];
	var password = req.body['password'];
	var data = {phone: phone, password: password};
	console.log(data);
	//操作数据库
	function findData(db){
		var conn = db.collection('login');
		conn.find(data,{phone:1,password:1}).toArray(function(err, results){
			if(results.length > 0){
				// res.redirect('/');
				res.send(data);
				return;
			}else{
				res.redirect('/login');
			}
		})
	}

	//通过mongoClinet连接数据库
	if(phone && password){
		MongoClient.connect(DB_CONN_STR,function(err,db){
			if(err){
				console.log(err);
				return;
			}else{
				console.log("数据库连接成功");
				findData(db);
				
			}
		})
	}else{
		res.redirect('/login');
	}
	

})
/*router.all('/ajax', function(req, res) {
  console.log(req.query['phone']);
  var obj = {
    test: 'message',
    admin: '12222'
  }
  res.send(obj)
})*/
router.all("/img",function(req,res){
	console.log('aaa')
	var img = req.query['pic'];
	
	var data = [{img:img}];
	// var val = {phone: phone};
	//操作数据库
	function insertData(db){
		var conn = db.collection('img');
		conn.insert(data,function(err, results){
			if(err){
				console.log(err);
				console.log(2);
				return;
			}else{
				// req.session.phone = str;
				// res.send({img:img});
				res.redirect('/');
				// console.log(1);
				db.close();
			}
		})
	}
	
	//通过mongoClinet连接数据库
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log("数据库连接成功");
			
			insertData(db);
			// findData(db);
			
		}
	})

})

module.exports = router;

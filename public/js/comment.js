$(function(){
	$(".show_btn").click(function(){
		var value = $("#show_con").val();
		var phone = $(".header_inner i").html();
		console.log(value);
		var time = new Date();
		var month = time.getUTCMonth() + 1;
		var hours = time.getUTCHours() + 8;
		console.log(time.getFullYear() + '-' + month + '-' + time.getDate() + ' ' + hours + ":" + time.getUTCMinutes());
		var timer = time.getFullYear() + '-' + month + '-' + time.getDate() + ' ' + hours + ":" + time.getUTCMinutes();
		var data = {username:phone,content:value,time:timer,img:"https://img.meituan.net/avatar/48965d7bee4e8206c2718fbf65542b98147319.jpg",approve:"0"};
		$.ajax({
			url:"/users/comment",
			type:"post",
			dataType:"json",
			data: data,
			success:function(data){
				console.log(data);
				location.href = "http://localhost:3000/comment";
			}
			
		})
	})
	$(".btn").click(function(){
		console.log("success");
		/*var phone = $(".phone").val();
		var password = $(".pwd").val();	*/
		var comment = $(".com").val();
		var password = $(".pwd").val();
		// console.log(text)
		// console.log({phone:phone,password:password});
		// console.log(text)
		$.ajax({
			url:"/users/comment",
			type:"post",
			dataType:"json",
			data: {comment:comment,password:password},
			success:function(data){
				console.log(data);
				// location.href = "http://localhost:3000/";
			}
			
		})

	})
	
	/*$.ajax({
			url:"/users/comment",
			type:"post",
			dataType:"json",
			data: {},
			success:function(data){
				console.log(data);
				// location.href = "http://localhost:3000/";
				// return data;
			}
			
		})*/
	/*$(".btnmore").click(function(){
		console.log("success");
		$.ajax({
			url:"/users/comment1",
			type:"get",
			dataType:"json",
			// data: {comment:comment,password:password},
			success:function(data){
				console.log(data);
				// location.href = "http://localhost:3000/";
			}
			
		})
	})*/


})


/*db.comment.insert([{username:"JiU891898223",content:"特别正能量满满的喜燃电影啊！《夏洛特烦恼》之前艾伦的印象还一直觉得是“傻春”这种呢，这次真是好大的突破，“娘意”里还是一样的爷们！而且感觉艾迪生的皮囊下就是马小，有梦想有坚持感情深切的马小",time:"2017-09-30 12:06",img:"https://img.meituan.net/avatar/48965d7bee4e8206c2718fbf65542b98147319.jpg",approve:"3313"},{username:"你的骄傲2017",content:"这个影片看起来太逗比啦，开心麻花出品，必属精品",time:"2017-09-30 12:08",img:"https://img.meituan.net/avatar/b7f01cb4ba563755ecf282e0e1e63c6c133566.jpg",approve:"3216"},{username:"嬉皮与鱼",content:"刚刚看完，期待了两个月 终于等到了，笑点太多了，整个影厅都是一片欢笑，艾伦突破很大，细节做的也都不错，还注意到了ad的广告，片子真心不错，建议大家观看",time:"2017-09-30 12:12",img:"https://img.meituan.net/avatar/f3f8e91980786623a98e57846e3447c227089.jpg",approve:"2684"}])*/